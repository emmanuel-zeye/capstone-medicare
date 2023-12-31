package net.staphy.capstone.backend.services;

import lombok.extern.slf4j.Slf4j;
import net.staphy.capstone.backend.dtos.Pager;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.Optional;

@Slf4j
public class BaseService<Entity> {

    private final JpaRepository<Entity, Long> repository;

    public BaseService(JpaRepository<Entity, Long> repository) {
        this.repository = repository;
    }

    public ResponseEntity<Entity> findOne(Long id) {
        Optional<Entity> item = repository.findById(id);
        return item.map(i -> ResponseEntity.ok().body(i)).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<List<Entity>> findAll() {
        return ResponseEntity.ok().body(repository.findAll());
    }

    public ResponseEntity<Page<Entity>> findAll(Pager pager) {
        PageRequest pageRequest = getPageRequest(pager);
        return ResponseEntity.ok().body(repository.findAll(pageRequest));
    }

    public PageRequest getPageRequest(Pager pager) {
        Sort sort = Sort.unsorted();
        if(!ObjectUtils.isEmpty(pager.getSortColumn()) && !ObjectUtils.isEmpty(pager.getOrder())) {
            sort = Sort.by(pager.getOrder(), pager.getSortColumn());
        }
        return PageRequest.of(pager.getPage(), pager.getPageSize(), sort);
    }

    public ResponseEntity<Entity> create(Entity entity) {
        return ResponseEntity.ok().body(repository.save(entity));
    }

    public ResponseEntity<Entity> updateOne(Long id, Entity entity) {
        Entity ent = repository.findById(id).orElse(null);
        if(ent != null) {
            BeanUtils.copyProperties(entity, ent, "id");
            log.info("Source {}, updated: {}", entity, ent);
            return ResponseEntity.ok().body(repository.save(ent));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deleteOne(long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
