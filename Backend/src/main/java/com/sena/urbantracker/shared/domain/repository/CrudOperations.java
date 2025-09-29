package com.sena.urbantracker.shared.domain.repository;

import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CrudOperations<DReq, DRes, ID> {

    CrudResponseDto<DRes> create(DReq request) throws BadRequestException;

    CrudResponseDto <Optional<DRes>> findById(ID id);

    CrudResponseDto <List<DRes>> findAll();

    CrudResponseDto <DRes> update(DReq request, ID id) throws BadRequestException;

    CrudResponseDto<DRes> deleteById(ID id);

    CrudResponseDto <DRes> activateById(ID id);

    CrudResponseDto <DRes> deactivateById(ID id);

    CrudResponseDto <Boolean> existsById(ID id);
}
