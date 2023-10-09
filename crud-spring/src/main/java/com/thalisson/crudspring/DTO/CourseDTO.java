package com.thalisson.crudspring.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record CourseDTO(
        @JsonProperty("_id") Long id,
        @NotBlank @NotNull @Length(min = 2, max = 200) String name,
        @NotNull @Length(min = 2, max = 30) @Pattern(regexp = "Nenhuma|Front-end|Back-end|Full-stack|Outra") String category) {

}
