package com.sena.urbantracker.shared.domain.repository;

import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;

import java.util.List;
import java.util.Optional;

public interface CrudOperations<T, ID> {

    CrudResponseDto<T> create(T dto);

    CrudResponseDto <Optional<T>> findById(ID id);

    CrudResponseDto <List<T>> findAll();

    CrudResponseDto <T> update(T dto);

    CrudResponseDto<T> deleteById(ID id);

    CrudResponseDto <T> activateById(ID id);

    CrudResponseDto <T> deactivateById(ID id);

    CrudResponseDto <Boolean> existsById(ID id);
}
