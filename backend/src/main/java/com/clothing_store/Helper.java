package com.clothing_store;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Helper {
    public static String convertListToJson(List<String> addresses) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(addresses);  // Chuyển List thành JSON
    }
}
