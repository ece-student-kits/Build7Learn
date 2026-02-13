# Code
`Task: To interface Servo Motor with STM32`
### Step 1: Create a STM32 Project "Servo"

---

### Step 2: Clock Configuration

- Select `HSE` in the **PLL Source Mux**
- Select `PLLCLK` in the **System Clock Mux**
- The **HCLK (MHz)** is set at `180` Mhz, and press Enter
- After the clock is initialized, select the **APB1 Prescaler** as `/8`

- We use the **TIM2** for the **PWM**, which is connected to the APB1 Bus
- The **APB1 Timer clock** is at **45 MHz** right now

![Image](..\Images\Servo\3.png)

### Step 3: Pinout & Configuration

#### Timer Configuration- TIM2

![Image](..\Images\Servo\8.png)

**Mode:**
- Set the **Clock source** as `internal clock`, which is at 45 MHz (same as APB1)
- Select the `PWM channel` for the Timer, in **Channel 1**

**Configuration:**
- Under parameter settings:
    - Set **Prescalar** value as `90-1`
    - Set **Counter Period** as `10000-1`

**Pinout:**

![Image](..\Images\Servo\Servo.png)

- Set Pin **`PA0`** as the **PWM output** Pin and we will connect it to the Servo Motor Signal pin.
- The output Frequency of the PWM signal depends on 3 parameters- **Timer Clock, ARR and Prescaler**

### Step 4: Code Snippet to Control Servo Rotation

Paste the following code snippet inside the `/* USER CODE BEGIN PFP */` in `main.c`:

```c
int angle(int val);
```

Paste the following code snippet inside the `/* USER CODE BEGIN 2 */` in `main.c`:

```c
HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);
```

Paste the following code snippet inside the `While (1)` in `main.c`:

```c
__HAL_TIM_SET_COMPARE(&htim2,TIM_CHANNEL_1, angle(0));
HAL_Delay(1000);
__HAL_TIM_SET_COMPARE(&htim2,TIM_CHANNEL_1, angle(90));
HAL_Delay(1000);
__HAL_TIM_SET_COMPARE(&htim2,TIM_CHANNEL_1, angle(180));
HAL_Delay(1000);
```

Paste the following code snippet inside the `/* USER CODE BEGIN 4 */` in `main.c`:

```c
int angle(int val){
	int per_deg = 5.55;  //pulse value for 1° Rotation
	int pulse = 250 + (val * per_deg);  // calculate pulse value, starting from 25
	return pulse;
}
```