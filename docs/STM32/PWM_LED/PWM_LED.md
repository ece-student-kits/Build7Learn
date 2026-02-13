# LED Brightness Control(PWM)

`Task: Control Inbuilt LED Brightness using PWM`

[Docs](https://www.youtube.com/watch?si=7hth3Sx5RFlsIIXU&v=iXWyISYmeQ0&feature=youtu.be)

![Image](..\Images\PWM\3.png)

---

## Steps:-

### Step 1: Create a STM32 Project "PWM_LED"
- Create a new project & initialize all pheripherals in default configuration

---

### Step 2: Clock Configuration

- The system clock is set at **180 Mhz**

![Image](..\Images\PWM\1.png)

### Step 3: Pinout & Configuration

#### Timer Configuration- TIM2

![Image](..\Images\PWM\2.png)

**Mode:**
- Select the `PWM Generation CH1`, in **Channel 1**

**Configuration:**
- Under parameter settings:
    - Set **Prescalar** value as `180-1`
    - Set **Counter Period** as `255-1`

**Pinout:**
- Click the Pin `PA5` and set it as `TIM2_CH1`

---

### Step 3: Code Snippet to Control Brightness of LED using PWM

Paste the following code snippet inside the `/* USER CODE BEGIN 2 */` loop in `main.c`:

```c
HAL_TIM_PWM_Start(&htim2,TIM_CHANNEL_1);
```

Paste the following code snippet inside the `while (1)` loop in `main.c`:

```c
for(int i=0; i<255; i++){
    __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, i);
    HAL_Delay(5);
}
for(int i=255; i>0; i--){
    __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, i);
    HAL_Delay(5);
}
```