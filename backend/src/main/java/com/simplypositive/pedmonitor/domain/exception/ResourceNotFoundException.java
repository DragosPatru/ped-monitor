package com.simplypositive.pedmonitor.domain.exception;

public class ResourceNotFoundException extends Exception {

  public ResourceNotFoundException(String message) {
    super(message);
  }

  public ResourceNotFoundException(String resourceName, Object id) {
    super("Resource " + resourceName + " having id " + id.toString() + " - not found.");
  }
}
