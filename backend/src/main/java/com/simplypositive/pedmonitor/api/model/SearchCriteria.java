package com.simplypositive.pedmonitor.api.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchCriteria {

  private List<Sorting> sorting = new ArrayList<>(Arrays.asList());
}
