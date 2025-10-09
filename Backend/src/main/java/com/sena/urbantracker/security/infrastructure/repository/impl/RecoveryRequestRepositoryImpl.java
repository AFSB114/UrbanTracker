package com.sena.urbantracker.security.infrastructure.repository.impl;

import com.sena.urbantracker.security.domain.entity.RecoveryRequestDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RecoveryRequestRepository;
import com.sena.urbantracker.security.infrastructure.persistence.mapper.RecoveryRequestPersistenceMapper;
import com.sena.urbantracker.security.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.sena.urbantracker.security.infrastructure.persistence.model.RecoveryRequestModel;
import com.sena.urbantracker.security.infrastructure.persistence.model.UserModel;
import com.sena.urbantracker.security.infrastructure.repository.jpa.RecoveryRequestJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RecoveryRequestRepositoryImpl implements RecoveryRequestRepository {

    private final RecoveryRequestJpaRepository jpaRepository;

    public String newMethodo (){
       RecoveryRequestModel model = new RecoveryRequestModel();

        return model.newMetho();
    }

    @Override
    public RecoveryRequestDomain save(RecoveryRequestDomain domain) {
        RecoveryRequestModel model = RecoveryRequestPersistenceMapper.toModel(domain);
        RecoveryRequestModel saved = jpaRepository.save(model);
        return RecoveryRequestPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<RecoveryRequestDomain> findById(Long id) {
        return jpaRepository.findById(id).map(RecoveryRequestPersistenceMapper::toDomain);
    }

    @Override
    public List<RecoveryRequestDomain> findAll() {
        return jpaRepository.findAll()
                .stream()
                .map(RecoveryRequestPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public Optional<RecoveryRequestDomain> findTopByUserOrderByCreatedAtDesc(UserDomain user) {
        UserModel userModel = UserPersistenceMapper.toModel(user);
        return jpaRepository.findTopByUserOrderByCreatedAtDesc(userModel).map(RecoveryRequestPersistenceMapper::toDomain);
    }

    @Override
    public long deleteAllByUser(UserDomain user) {
        UserModel userModel = UserPersistenceMapper.toModel(user);
        return jpaRepository.deleteAllByUser(userModel);
    }

    @Override
    public void delete(RecoveryRequestDomain recoveryRequest) {
        RecoveryRequestModel model = RecoveryRequestPersistenceMapper.toModel(recoveryRequest);
        jpaRepository.delete(model);
    }
}