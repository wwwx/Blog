package recordTest;

import com.eachnet.bid.web.common.dto.response.OperationResult;
import com.eachnet.bid.web.order.param.request.BidRecordParam;
import org.junit.Test;
import org.springframework.web.client.RestTemplate;

public class TestRecord {

    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    public void testAddRecord() {
        String url = "http://localhost:8081/bidWeb/recordService/add";
        BidRecordParam recordDto = new BidRecordParam();
        recordDto.setItemId(222);
        recordDto.setItemName("One Item11");
        recordDto.setBidPrice(3000D);
        recordDto.setBuyerOnlyid(999);
        recordDto.setBuyerName("calix");
        OperationResult operationResult = restTemplate.postForObject(url, recordDto, OperationResult.class);
        System.out.println(operationResult);
    }

    @Test
    public void testGetRecord() {
        String url = "http://localhost:8081/bidWeb/recordService/record/1";
        OperationResult operationResult = restTemplate.getForObject(url, OperationResult.class);
        System.out.println(operationResult);
    }

    @Test
    public void testRecords() {
        String url = "http://localhost:8081/bidWeb/recordService/records/list";
        BidRecordParam recordParam = new BidRecordParam();
        recordParam.setItemId(222);
        recordParam.setBuyerOnlyid(999);
        recordParam.setPageNum(1);
        recordParam.setPageSize(4);
//        recordParam.setUpdateTimeRange(new Range<>(new Timestamp(System.currentTimeMillis()-50000000), new Date()));

        OperationResult operationResult = restTemplate.postForObject(url, recordParam, OperationResult.class);
        System.out.println(operationResult.getData());
    }

    @Test
    public void testRecordPage() {
        String url = "http://localhost:8081/bidWeb/recordWeb/records/page";
        BidRecordParam recordParam = new BidRecordParam();
//        recordParam.setItemId(222);
        recordParam.setBuyerOnlyid(222);
        recordParam.setPageNum(1);
        recordParam.setPageSize(4);
//        recordParam.setUpdateTimeRange(new Range<>(new Timestamp(System.currentTimeMillis()-50000000), new Date()));
        OperationResult operationResult = restTemplate.postForObject(url, recordParam, OperationResult.class);
        System.out.println(operationResult.getData());
    }
}
