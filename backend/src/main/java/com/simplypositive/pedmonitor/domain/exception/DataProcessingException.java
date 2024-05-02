package com.simplypositive.pedmonitor.domain.exception;

public class DataProcessingException extends RuntimeException {

  public DataProcessingException(String message) {
    super(message);
  }

  public DataProcessingException(String message, Throwable th) {
    super(message, th);
  }
}
