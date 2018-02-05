package recordTest;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.payment.param.request.BidDepositParam;
import com.eachnet.bid.web.payment.param.request.BidDepositSimpleParam;
import org.junit.Test;
import org.springframework.web.client.RestTemplate;

public class TestDeposit {

    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    public void testAddDeposit() {
        String url = "http://localhost:8081/bidWeb/payment/pay/deposit";
        BidDepositParam depositParam = new BidDepositParam();
        depositParam.setAmount(500D);
        depositParam.setUserOnlyid(4444);
        depositParam.setUserName("calix");
        depositParam.setRemark("test remark 5");
        depositParam.setItemId(444);

        OperationResult result = restTemplate.postForObject(url, depositParam, OperationResult.class);
        System.out.println(result);
    }

//    @Test
//    public void testQueryDeposit() {
//        BidDepositSimpleParam param = new BidDepositSimpleParam();
//        param.setUserOnlyid(4444);
//        param.setItemId(444);
//        String url = "http://localhost:8081/bidService/payment/info";
//        OperationResult result = restTemplate.postForObject(url, param, OperationResult.class);
//        System.out.println(result);
//    }

    public static void main(String[] args) {
        int i = 121210;
        Object j = i;
        System.out.println(j.toString());
    }
}
