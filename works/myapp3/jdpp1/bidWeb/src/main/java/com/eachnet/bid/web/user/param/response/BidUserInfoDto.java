package com.eachnet.bid.web.user.param.response;

import java.io.Serializable;

public class BidUserInfoDto implements Serializable {
	
	private static final long serialVersionUID = 8083791776203489139L;
	
	 private String accountType;
	 private String groupId;
	 private String mobile;
	 private String returnMessage;
	 private String usrRole;
	 private String usrGender;
	 private String returnCode;
	 private String usrNameCn;
	 private String dob;
	 private String email;
	 private String usrFlag;
	 private String usrOrgcode;
	 private String usrOnlyId;
	 
	 
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getReturnMessage() {
		return returnMessage;
	}
	public void setReturnMessage(String returnMessage) {
		this.returnMessage = returnMessage;
	}
	public String getUsrRole() {
		return usrRole;
	}
	public void setUsrRole(String usrRole) {
		this.usrRole = usrRole;
	}
	public String getUsrGender() {
		return usrGender;
	}
	public void setUsrGender(String usrGender) {
		this.usrGender = usrGender;
	}
	public String getReturnCode() {
		return returnCode;
	}
	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}
	public String getUsrNameCn() {
		return usrNameCn;
	}
	public void setUsrNameCn(String usrNameCn) {
		this.usrNameCn = usrNameCn;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsrFlag() {
		return usrFlag;
	}
	public void setUsrFlag(String usrFlag) {
		this.usrFlag = usrFlag;
	}
	public String getUsrOrgcode() {
		return usrOrgcode;
	}
	public void setUsrOrgcode(String usrOrgcode) {
		this.usrOrgcode = usrOrgcode;
	}
	public String getUsrOnlyId() {
		return usrOnlyId;
	}
	public void setUsrOnlyId(String usrOnlyId) {
		this.usrOnlyId = usrOnlyId;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	@Override
	public String toString() {
		return "BidUserCookieDto [accountType=" + accountType + ", groupId=" + groupId
				+ ", mobile=" + mobile + ", returnMessage=" + returnMessage + ", usrRole=" + usrRole + ", usrGender="
				+ usrGender + ", returnCode=" + returnCode + ", usrNameCn=" + usrNameCn + ", dob=" + dob + ", email="
				+ email + ", usrFlag=" + usrFlag + ", usrOrgcode=" + usrOrgcode + ", usrOnlyId=" + usrOnlyId + "]";
	}
	 
	 
}
