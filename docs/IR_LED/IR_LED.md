# DigitalSensors: IR_LED

`Task: Interface an IR Sensor and light up LED if object is detected`

![Image](..\Images\DigitalSensors\4.png)

**Pinout:**
- `Pin 1` **VCC** (+5V)
- `Pin 2` **DigitalOut** (Connected to PA6 [D12])
- `Pin 3` **GND** (Ground)

---

## STEPS:

### Step 1: Create a STM32 Project "IR_LED"
- Create a new project & initialize all pheripherals in default configuration
---

### Step 2: Configure GPIO Pins

[Docs](https://wiki.st.com/stm32mcu/wiki/STM32StepByStep:Step2_Blink_LED)

![Image](..\Images\DigitalSensors\3.png)

- **PA5** as `GPIO_OUTPUT` (Inbuilt LED) [D13]
- **PA6** as `GPIO_INPUT` (IR_Sensor Value) [D12]

#### GPIO Pin Details:
- **Inbuilt LED**: Port A, GPIO Pin 5
- **IR Sensor**: Port A, GPIO Pin 6
---

### Step 3: Code Snippet for Button Press and LED Toggling

`!HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_6)` - Function to Read status of GPIO Pin

Paste the following code snippet inside the `while(1)` loop in `main.c`:

```c
// Check if the user button (PC13) is pressed
if(!HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_6))
    //Make Pin HIGH
    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5,GPIO_PIN_SET);
else
    //Make Pin LOW
    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5,GPIO_PIN_RESET);
```