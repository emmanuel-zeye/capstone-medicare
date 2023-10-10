package net.staphy.capstone.backend.controllers;

import jakarta.validation.Valid;
import net.staphy.capstone.backend.dtos.Pager;
import net.staphy.capstone.backend.services.BaseService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class BaseController<Entity> {

    private final BaseService<Entity> service;

    public BaseController(BaseService<Entity> baseService) {
        this.service = baseService;
    }

    @GetMapping("{id}")
    public ResponseEntity<Entity> findById(@PathVariable Long id) {
        return service.findOne(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Entity>> findAll() {
        return service.findAll();
    }

    @GetMapping("")
    public ResponseEntity<Page<Entity>> findAllPaged(Pager pager) {
        return service.findAll(pager);
    }

    @PostMapping("")
    public ResponseEntity<Entity> createOne(@RequestBody @Valid Entity entity) {
        return service.create(entity);
    }

    @PostMapping("with-attachments")
    public ResponseEntity<Entity> createOneWithFiles(@RequestParam("attachments") MultipartFile[] file, @RequestPart Entity entity) {
        return service.create(entity);
    }

    @PutMapping("{id}")
    public ResponseEntity<Entity> updateOne(@PathVariable Long id,  @RequestBody @Valid Entity entity) {
        return service.updateOne(id , entity);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteOne(@PathVariable long id) {
        return service.deleteOne(id);
    }



}
