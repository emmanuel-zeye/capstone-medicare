package net.staphy.capstone.backend.services;

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
        Sort sort = Sort.unsorted();
        if(!ObjectUtils.isEmpty(pager.getSortColumn()) && !ObjectUtils.isEmpty(pager.getOrder())) {
            sort = Sort.by(pager.getOrder(), pager.getSortColumn());
        }
        PageRequest pageRequest = PageRequest.of(pager.getPage(), pager.getPageSize(), sort);
        return ResponseEntity.ok().body(repository.findAll(pageRequest));
    }

    public ResponseEntity<Entity> create(Entity entity) {
        return ResponseEntity.ok().body(repository.save(entity));
    }

    public ResponseEntity<Entity> updateOne(Long id, Entity entity) {
        Optional<Entity> ent = repository.findById(id);
        if(ent.isPresent()) {
            BeanUtils.copyProperties(entity, ent, "id");
            return ResponseEntity.ok().body(repository.save(ent.get()));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deleteOne(long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
