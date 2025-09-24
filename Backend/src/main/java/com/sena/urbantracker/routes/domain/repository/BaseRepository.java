package com.sena.urbantracker.routes.domain.repository;


import com.sena.urbantracker.shared.domain.repository.RepositoryOperations;

import java.util.List;
import java.util.Optional;

public interface BaseRepository<T, ID> {
    List<T> findAll();

    Optional<T> findById(ID id);

    T save(T route);

    void deleteById(ID id);

    boolean existsById(ID id);
}
