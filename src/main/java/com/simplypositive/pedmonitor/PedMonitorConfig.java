package com.simplypositive.pedmonitor;

import com.simplypositive.pedmonitor.service.SustainabilityIndicatorRegistry;
import com.simplypositive.pedmonitor.service.impl.SustainabilityIndicatorRegistryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class PedMonitorConfig {

  @Bean
  public SustainabilityIndicatorRegistry indicatorRegistry() {
    return new SustainabilityIndicatorRegistryImpl();
  }

  @Bean
  @Description("Spring Message Resolver")
  public ResourceBundleMessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasename("messages");
    return messageSource;
  }
}
