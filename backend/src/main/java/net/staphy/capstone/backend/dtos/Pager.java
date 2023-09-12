package net.staphy.capstone.backend.dtos;

import lombok.Data;
import org.springframework.data.domain.Sort;

@Data
public class Pager {
    private int page = 0;
    private int pageSize = 20;
    private String sortColumn;
    private Sort.Direction order;
}
