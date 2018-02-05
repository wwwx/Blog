package com.eachnet.bid.web.user.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.eachnet.bid.web.common.constant.UserLoginHistory;
import com.eachnet.bid.web.common.exception.CommonException;
import com.eachnet.bid.web.common.util.CookieUtil;
import com.eachnet.bid.web.user.param.request.BidUserParam;
import com.ule.user.api.auth.manager.IAuthManager;
import com.ule.user.api.auth.manager.impl.AuthManager;
import com.ule.user.api.auth.vo.AuthResponse;
import com.ule.user.api.auth.vo.EmailAuthRequest;
import com.ule.user.api.auth.vo.MobileAuthRequest;

import net.sf.json.JSONObject;

@Service
public class BidUserService {

	@Value("${EACHNET_COOKIE}")
	private String eachnetCookie;

	private static final Logger logger = LoggerFactory.getLogger(BidUserService.class);
	private IAuthManager authManager = new AuthManager();

	public Map<String, Object> loginAccountVerify(BidUserParam userDto, HttpServletResponse response)
			throws CommonException {

		MobileAuthRequest request = new MobileAuthRequest();
		request.setMobile(userDto.getLoginName());
		request.setPlainPwd(userDto.getPassword());
		request.setLoginIp(userDto.getLoginIp());
		request.setLoginType(UserLoginHistory.LOGIN_TYPE.getValue());
		request.setLoginFrom(UserLoginHistory.LOGIN_FROM.getValue());
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			AuthResponse responseDate = authManager.authByMobile(request);
			if (responseDate == null) {
				map.put("returnCode", "FAIL");
				map.put("returnMsg", "验证请求异常");
				return map;
			}
			JSONObject json = JSONObject.fromObject(responseDate);
			logger.info("loginAccountVerify:AuthResponse:" + json.toString());
			String code = json.get("returnCode").toString();
			String returnMessage = json.get("returnMessage").toString();
			if (code.equals("70000")) {
				map.put("returnCode", "SUCCESS");
				map.put("returnMsg", "登录成功");
				Map<String, Object> data = new HashMap<String, Object>();
				String usrOnlyId = json.get("usrOnlyId").toString();
				data.put("userId", usrOnlyId);
				data.put("loginName", userDto.getLoginName());
				map.put("data", data);
				CookieUtil.addCookieByEncrypt(response, eachnetCookie, json.toString(), 60 * 60 * 24 * 3);
				return map;
			}
			map.put("returnCode", "FAIL");
			map.put("returnMsg", returnMessage);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return map;
	}

	public Map<String, Object> loginEmailVerify(BidUserParam userDto, HttpServletResponse response)
			throws CommonException {
		EmailAuthRequest request = new EmailAuthRequest();
		request.setEmail(userDto.getLoginName());
		request.setPlainPwd(userDto.getPassword());
		request.setLoginIp(userDto.getLoginIp());
		request.setLoginType(UserLoginHistory.LOGIN_TYPE.getValue());
		request.setLoginFrom(UserLoginHistory.LOGIN_FROM.getValue());
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			AuthResponse responseDate = authManager.authByEmail(request);
			if (responseDate == null) {
				map.put("returnCode", "FAIL");
				map.put("returnMsg", "验证请求异常");
				return map;
			}
			JSONObject json = JSONObject.fromObject(responseDate);
			logger.info("loginEmailVerify:AuthResponse:" + json.toString());
			String code = json.get("returnCode").toString();
			String returnMessage = json.get("returnMessage").toString();
			if (code.equals("70000")) {
				map.put("returnCode", "SUCCESS");
				map.put("returnMsg", "登录成功");
				Map<String, Object> data = new HashMap<String, Object>();
				String usrOnlyId = json.get("usrOnlyId").toString();
				data.put("userId", usrOnlyId);
				data.put("loginName", userDto.getLoginName());
				map.put("data", data);
				CookieUtil.addCookieByEncrypt(response, eachnetCookie, json.toString(), 60 * 60 * 24 * 3);
				return map;
			}
			map.put("returnCode", "FAIL");
			map.put("returnMsg", returnMessage);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return map;
	}

	/*public static void main(String[] args) {
//		String kk = "23sf3dwio|nlD17NoI2LuxPM52MINmD7byRuJceyFV7ZZObr+Ha4/uhRYFlG7WymcziozbFMb8LzFFgG7qEMGkzONj1hMq8i0Syj5z/6QzOG/KTjzdiXD07nnaQd/BmrIQFctZ23laCe7YI8CWeFA+EIVO1hhdBiA6QcgQNm+oxCxGJk9FugNywOPOhGiUc0B33jG4v0+RLyyhZN/zRGGBWEWB0JcCzOjvMkQbUKNNXt6MTO/F85OyyXLNWAZiNQTsanceLW52BhL8HoeHvMmxrDdQRNLJsRbQ+tD5muiTWwv4pOOy4KSRlIE50LYjcrj/ReCapCAtJ3xPVoMy8b9ro5HkHJ892w==|BedAxYKPvQ4WIZO6nlCLvlXcmZPARVei36Ijytza+h6vpsmdcX0qbGBb412hRRVlje/14XWPhoJfu/bIdIu7UPOusoJL4KdoX0dvZNEfUZ1M4bJgc+99d1Ahz++f0QBZjETcBC7UPNEmJw6DHOOAjqd3I0dhytxk3sufa7lnJ6OYYyLnAmQWlbu012cKOUiwgdLjv1Puv+APnxwFEFR82Hr/lSLH4rnTGa3mcfiQlOM6i2QDAC6XEIq4OyHgjtev5JCh5n/M1gI2piMAFzBBPv3/l4C5td5kaeHVP7Y04st70oNOh2+0UlTHPCwpU7Kk/zNBVTh9mQF.";
		String kk = "23sf3dwio|VxqvjACZ3wAkI+uWGeadJ0Ua9J15Msmmde+eWs3ny5Qf+IDvCrlO+5vse6SFHOZQwo3wsCINRlOg/eNTqcxn39BO+BVr3+yXi82W6EAfd57TejrOXK+4WQJyftuRnhQobvHSk+jSq/b95B2GZwRi/yqSUArLvTe+IR5xAFLAikg4DcxY/NL7WDPNxXBwvJxsz/0k0QH0T4xoOyqv26VVcllxcrVIX7xfMTF90TcJLQX8w32Y9xPVlSfh7u9fGkhSrbTM8aCjaPOR5x0jkGL4LmfR0HPDC5fvWiwoQNnk1RqBQlKfiCdxn8erTrxS3glgeUT56mq/IxAVmBpIn7+icQ==|JAr+4htI0twLGtJ0ITNJlvXtz+jM4nFx4Gs5+abteZ/q3joYjvCHX8KoO3xuMloDI7BI8G5NnmboWL3rzn4Vk3qTpnHPK0vwPBKwOpqzd0xALDAktHigD+7KZs//n49JaFiQ/O2bjW5WIaGoTRyJdJ5AK6GUQdFWq1+0SEu4m1eZXd/UBlIMsy5zRBYuJPeuFakRO3DnzWbMVEtch6DcYz/1ke2HeKjG4ky/orp3VHVBrjN4HGlnRKw2v4uuDq0G4ByLz8lwRYdis5J38ViGxiNPNxxFdxqkELg63u7GWWmdgklBqlHsjgU77F4M1bbEm3VDa02Pk9A.";
		String decode = UleRsa.decode(kk);
		BidUserInfoDto parseObject = JSON.parseObject(decode, BidUserInfoDto.class);
		System.out.println(parseObject.toString());
	}*/

}
