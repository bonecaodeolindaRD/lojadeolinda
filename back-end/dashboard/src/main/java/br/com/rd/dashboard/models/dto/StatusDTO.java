package br.com.rd.dashboard.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusDTO {
    private Long id;
    @NotBlank
    private String name;
}
