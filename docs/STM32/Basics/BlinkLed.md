# Basics: BlinkLed
`Task: Cofigure inbuilt LED and blink at a delay of 1 Sec`
### Step 1: Create a STM32 Project "BlinkLed"

---

### Step 2: Configure "PA5" as "GPIO_OUTPUT"

- [Docs](https://wiki.st.com/stm32mcu/wiki/STM32StepByStep:Step2_Blink_LED)

![Image](..\Images\BlinkLED\1.png)

#### Port A, GPIO Pin 5 Configuration
- (Already configured when initialized the pheripherals in default configuration)
---

### Step 3: Code Snippet for LED Blinking

Place the following code under 'while(1)' inside the main loop:

- #### Toggle the status of the GPIO PIN:
```c
// Toggle LED connected to PA5
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
HAL_Delay(100);   // Insert delay 100 ms
```
- #### Write a GPIO PIN as HIGH/LOW:
```c
// Toggle LED connected to PA5
HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);
HAL_Delay (100);   /* Insert delay 100 ms */
HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);
HAL_Delay (100);   /* Insert delay 100 ms */
```