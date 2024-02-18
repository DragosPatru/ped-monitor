package com.simplypositive.pedmonitor.repository;

import com.simplypositive.pedmonitor.domain.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {}
