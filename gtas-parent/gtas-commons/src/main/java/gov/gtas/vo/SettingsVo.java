/*
 * All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
 * 
 * Please see LICENSE.txt for details.
 */
package gov.gtas.vo;

public class SettingsVo {
	private double matchingThreshold;
	private double flightRange;
	public double getMatchingThreshold() {
		return matchingThreshold;
	}
	public void setMatchingThreshold(double matchingThreshold) {
		this.matchingThreshold = matchingThreshold;
	}
	public double getFlightRange() {
		return flightRange;
	}
	public void setFlightRange(double flightRange) {
		this.flightRange = flightRange;
	}
	
}