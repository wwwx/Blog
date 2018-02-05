package com.eachnet.bid.web.item.util;

import java.io.InputStream;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ule.dfs.client.util.UploadFile;

public class UploadFileUtil {
	private static final Logger log = LoggerFactory.getLogger(UploadFileUtil.class);

	public static String uploadFile(String uploadUrl, String bussinessUnit, String fullName,
			String[] process, InputStream stream, boolean overWrite) {
		log.info(uploadUrl+"|" +bussinessUnit+"|"+fullName);
		try {
			String resMsg = UploadFile.upload(uploadUrl, bussinessUnit, fullName, overWrite,
					stream, process);
			log.info("UploadFile file response : " + resMsg);
			
			JSONObject jo = JSONObject.fromObject(resMsg);
			String status = (String) jo.get("status");
			if (status == null || !status.toLowerCase().equals("success")) {
				throw new RuntimeException("Upload response status error : " + status);
			}
			return (String) jo.get("url");
		} catch (Exception e) {
			log.error("uploadFile...", e);
			throw new RuntimeException("上传文件失败！", e);
		}
	}
}
