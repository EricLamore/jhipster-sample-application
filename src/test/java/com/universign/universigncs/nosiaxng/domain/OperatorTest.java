package com.universign.universigncs.nosiaxng.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.universign.universigncs.nosiaxng.web.rest.TestUtil;

public class OperatorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operator.class);
        Operator operator1 = new Operator();
        operator1.setId("id1");
        Operator operator2 = new Operator();
        operator2.setId(operator1.getId());
        assertThat(operator1).isEqualTo(operator2);
        operator2.setId("id2");
        assertThat(operator1).isNotEqualTo(operator2);
        operator1.setId(null);
        assertThat(operator1).isNotEqualTo(operator2);
    }
}
