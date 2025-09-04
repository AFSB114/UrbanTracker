package com.sena.urbantracker.shared.repository;

import com.sena.urbantracker.shared.model.dto.CrudResponseDto;

public interface ActivableEntity<T> {

    CrudResponseDto<T> activate();

    CrudResponseDto<T> deactivate();

    CrudResponseDto<Boolean> isActive ();

    CrudResponseDto<Boolean> isNotActive ();

    CrudResponseDto<java.util.List<T>> findAllActive();

    CrudResponseDto<java.util.List<T>> findAllInactive();
}
