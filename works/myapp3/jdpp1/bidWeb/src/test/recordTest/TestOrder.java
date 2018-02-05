package recordTest;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.order.param.request.BidOrderParam;
import org.junit.Test;
import org.springframework.web.client.RestTemplate;

public class TestOrder {

    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    public void testAddOrder() {
        String url = "http://localhost:8081/bidWeb/order/add";
        BidOrderParam orderParam = new BidOrderParam();
        orderParam.setItemId(222);
        orderParam.setItemName("Test Order 2");
        orderParam.setItemImageUrl("item/image/url");
        orderParam.setBuyerOnlyid(1111111);
        orderParam.setBuyerName("chao");
        orderParam.setBuyerIpAddr("192.168.113.123");
        orderParam.setChannel("Web");
        orderParam.setSalesChannel("on line");
        orderParam.setOrderAmount(555D);
        orderParam.setBidRecordId(3423);
        OperationResult result = restTemplate.postForObject(url, orderParam, OperationResult.class);
        System.out.println(result);
    }

    @Test
    public void testGetOrder() {
//        String url = "http://localhost:8081/bidWeb/order/get";
        String url = "http://bid.beta.eachnet.com/bidWeb/order/get/5";
        OperationResult result = restTemplate.getForObject(url, OperationResult.class);
        System.out.println(result);
    }

    @Test
    public void testFindOrders() {
//        String url = "http://localhost:8081/bidWeb/order/list";
        String url = "http://bid.beta.eachnet.com/bidWeb/order/list";
        BidOrderParam orderParam = new BidOrderParam();
        OperationResult result = restTemplate.postForObject(url, orderParam, OperationResult.class);
        System.out.println(result);
    }

    @Test
    public void testFindOrderPage() {
        String url = "http://localhost:8081/bidWeb/order/page";
        BidOrderParam orderParam = new BidOrderParam();
        orderParam.setPageNum(1);
        orderParam.setPageSize(10);
//        orderParam.setBuyerOnlyid(1111111);
        OperationResult result = restTemplate.postForObject(url, orderParam, OperationResult.class);
        System.out.println(result);
    }
}
