package com.simplypositive.pedmonitor.persistence.entity;

import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "SUSTAINABILITY_INDICATOR")
@AllArgsConstructor
@Builder
@Table(indexes = @Index(name = "indicator_pedId_idx", columnList = "pedId"))
public class IndicatorEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @NotNull private Integer pedId;

  @NotBlank private String code;

  @NotBlank private String unit;

  @NotBlank private String category;

  @NotBlank private String parentIndicatorCode;

  @NotNull private ResourceStatus definitionStatus = ResourceStatus.INITIAL;

  private Double totalValue = 0.0;

  private Instant createdAt = Instant.now();

  public boolean isFET() {
    return IndicatorMeta.isFET(this.code);
  }

  public boolean isRES() {
    return IndicatorMeta.isRES(this.code);
  }
}
