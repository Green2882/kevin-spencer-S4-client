package com.keyin;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class MidtermClientApplicationTest {

    @Test
    public void testMain() {
        MidtermClientApplication main = new MidtermClientApplication();
        assertNotNull(main);
    }
}
