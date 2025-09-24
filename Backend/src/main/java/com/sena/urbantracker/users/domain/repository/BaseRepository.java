package com.sena.urbantracker.users.domain.repository;


import com.sena.urbantracker.shared.domain.repository.RepositoryOperations;

import java.util.List;
import java.util.Optional;

public interface BaseRepository<T, ID> {
    List<T> findAll();

    Optional<T> findById(ID id);

    T save(T entity);

    void deleteById(ID id);

    boolean existsById(ID id);
}