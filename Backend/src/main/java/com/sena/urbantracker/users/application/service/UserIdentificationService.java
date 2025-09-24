package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.UserIdentificationReqDto;
import com.sena.urbantracker.users.application.dto.response.UserIdentificationResDto;
import com.sena.urbantracker.users.application.mapper.UserIdentificationMapper;
import com.sena.urbantracker.users.domain.entity.IdentificationTypeDomain;
import com.sena.urbantracker.users.domain.entity.UserIdentificationDomain;
import com.sena.urbantracker.users.domain.repository.UserIdentificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserIdentificationService implements CrudOperations<UserIdentificationReqDto, UserIdentificationResDto, Long> {

    private final UserIdentificationRepository userIdentificationRepository;

    @Override
    public CrudResponseDto<UserIdentificationResDto> create(UserIdentificationReqDto dto) {
        UserIdentificationDomain entity = UserIdentificationMapper.toEntity(dto);

        UserIdentificationDomain saved = userIdentificationRepository.save(entity);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(saved), "Identificación de usuario creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<UserIdentificationResDto>> findById(Long aLong) {
        UserIdentificationDomain userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada."));

        return CrudResponseDto.success(Optional.of(UserIdentificationMapper.toDto(userIdentification)), "Identificación de usuario encontrada");
    }

    @Override
    public CrudResponseDto<List<UserIdentificationResDto>> findAll() {
        List<UserIdentificationDomain> userIdentifications = userIdentificationRepository.findAll();
        return CrudResponseDto.success(userIdentifications.stream().map(UserIdentificationMapper::toDto).toList(), "Identificaciones de usuario encontradas");
    }

    @Override
    public CrudResponseDto<UserIdentificationResDto> update(UserIdentificationReqDto dto, Long id) {
        UserIdentificationDomain userIdentification = userIdentificationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + id + " no encontrada."));

        userIdentification.setIdentificationType(IdentificationTypeDomain.builder().id(dto.getIdentificationTypeId()).build());
        userIdentification.setIdentificationNumber(dto.getIdentificationNumber());
//        userIdentification.setActive(dto.getActive());

        UserIdentificationDomain updated = userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(updated), "Identificación de usuario actualizada correctamente");
    }

    @Override
    public CrudResponseDto<UserIdentificationResDto> deleteById(Long aLong) {
        if (!userIdentificationRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada.");
        }

        userIdentificationRepository.deleteById(aLong);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(null), "Identificación de usuario eliminada correctamente");
    }

    @Override
    public CrudResponseDto<UserIdentificationResDto> activateById(Long aLong) {
        UserIdentificationDomain userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada."));

        userIdentification.setActive(true);
        userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(userIdentification), "Identificación de usuario activada correctamente");
    }

    @Override
    public CrudResponseDto<UserIdentificationResDto> deactivateById(Long aLong) {
        UserIdentificationDomain userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada."));

        userIdentification.setActive(false);
        userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(userIdentification), "Identificación de usuario desactivada correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (userIdentificationRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Identificación de usuario con id " + aLong + " existe.");
        }
        return CrudResponseDto.success(false, "Identificación de usuario con id " + aLong + " no existe.");
    }

}
