package gov.gtas.svc;

import gov.gtas.model.GraphHitDetail;
import gov.gtas.model.GraphRule;
import gov.gtas.model.Passenger;
import gov.gtas.repository.AppConfigurationRepository;
import gov.gtas.repository.GraphHitDetailRepository;
import gov.gtas.repository.GraphRuleRepository;
import gov.gtas.repository.PassengerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GraphRulesServiceImpl implements GraphRulesService {


    private final
    GraphRuleRepository graphRuleRepository;

    private final Neo4JClient neo4JClient;

    private final PassengerRepository passengerRepository;

    private final GraphHitDetailRepository graphHitDetailRepository;

    public GraphRulesServiceImpl(
            GraphRuleRepository graphRuleRepository,
            AppConfigurationRepository appConfigurationRepository,
            PassengerRepository passengerRepository,
            GraphHitDetailRepository graphHitDetailRepository) {
        this.graphRuleRepository = graphRuleRepository;
        this.graphHitDetailRepository = graphHitDetailRepository;
        String url = appConfigurationRepository.findByOption(AppConfigurationRepository.GRAPH_DB_URL).getValue();
        Boolean neo4J = Boolean.valueOf(
                appConfigurationRepository.findByOption(AppConfigurationRepository.GRAPH_DB_TOGGLE).getValue()
        );
        if (neo4J) {
            this.neo4JClient = new Neo4JClient(url);
        } else {
            this.neo4JClient = null;
        }
        this.passengerRepository = passengerRepository;
    }


    @Override
    @Transactional
    public void saveResults(Set<GraphHitDetail> graphHitDetailSet) {
        if (graphHitDetailSet.isEmpty()) {
            return;
        }
        Set<Long> paxIds = graphHitDetailSet.stream().map(GraphHitDetail::getPassenger_id).collect(Collectors.toSet());
        Set<Passenger> passengerSet = passengerRepository.getPassengerWithGraphHit(paxIds);
        Set<GraphHitDetail> existingDetails = passengerSet.stream()
                .flatMap(p -> p.getGraphHitDetails().stream())
                .collect(Collectors.toSet());
        Set<GraphHitDetail> newHits =
                graphHitDetailSet
                        .stream()
                        .filter(ex -> !existingDetails.contains(ex))
                        .collect(Collectors.toSet());
        graphHitDetailRepository.saveAll(newHits);
    }

    @Override
    @Transactional
    public Set<GraphHitDetail> graphResults(Set<Passenger> passengers) {
        Iterable<GraphRule> graphRules = getGraphRules();
        Set<GraphHitDetail> graphHitDetails = new HashSet<>();
        Map<String, Passenger> paxMap = new HashMap<>();
        for (Passenger p : passengers) {
            paxMap.put(p.getPassengerIDTag().getIdTag(), p);
        }


        for (GraphRule graphRule : graphRules) {
            Set<String> passengerHitIds = getPassengerHitIds(graphRule, paxMap.keySet());
            for (String idTag : passengerHitIds) {
                Passenger passenger = paxMap.get(idTag);
                GraphHitDetail graphHitDetail = new GraphHitDetail();
                graphHitDetail.setGraphRule(graphRule);
                graphHitDetail.setPassenger_id(passenger.getId());
                graphHitDetails.add(graphHitDetail);
            }
        }
        return graphHitDetails;
    }


    private Set<String> getPassengerHitIds(GraphRule graphRule, Set<String> paxIds) {
        return neo4JClient.runQueryAndReturnPassengerIdHits(graphRule, paxIds);
    }

    private Iterable<GraphRule> getGraphRules() {
        return graphRuleRepository.findAll();
    }


}
