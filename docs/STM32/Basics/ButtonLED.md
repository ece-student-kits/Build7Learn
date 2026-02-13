# Basics: ButtonLED
`Task: Toggle inbuilt 'LED' on 'USER BUTTON' press`
### Step 1: Create a STM32 Project "ButtonLED"

---

### Step 2: Configure GPIO Pins

[Docs](https://wiki.st.com/stm32mcu/wiki/STM32StepByStep:Step2_Blink_LED)

![Image](..\Images\ButtonLED\1.png)

- **PA5** as `GPIO_OUTPUT` (Inbuilt LED)
- **PC13** as `GPIO_INPUT` (User Button)

(Already configured when initialized the pheripherals in default configuration)

#### GPIO Pin Details:
- **Inbuilt LED**: Port A, GPIO Pin 5
- **User Button**: Port C, GPIO Pin 13
---

### Step 3: Code Snippet for Button Press and LED Toggling

`!HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_13)` - Function to Read status of GPIO Pin

Paste the following code snippet inside the `while(1)` loop in `main.c`:

```c
// Check if the user button (PC13) is pressed
if (!HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_13)) {

    // Toggle the LED (PA5)
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
    HAL_Delay(100);   // Insert delay of 100 ms
}
```

- **Note**: The USER BUTTON is in PULL-UP Mode by default, so we use negative logic in 'IF condition'