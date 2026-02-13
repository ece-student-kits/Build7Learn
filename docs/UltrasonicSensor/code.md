# Code
`Task: To interface ultrasonic sensor with STM32`
### Step 1: Create a STM32 Project "Ultrasonic"

---

### Step 2: Clock Configuration

![Image](..\Images\Ultrasonic\2.png)

You can specify your `System clock`. We will set `HCLK (MHz)` as **180 MHz** and press 'ENTER'. And generate the code and associated perspectives by saving using CTRL + S.

---

### Step 3: Pinout & Configuration

![Image](..\Images\Ultrasonic\1.png)

- Configure system clock: 
  System Core > `RCC` then select ‘`Crystal/Ceramic Resonator`’ in from the High Speed Clock(`HSC`) feature

- Now configure `I2C` by following the procedure in 16x2 LCD tutorial or by following the step below.
(**DON'T FORGET TO ADD THE NECESSARY LIBRARY FILES FOR I2C_LCD**)

![Image](..\Images\Ultrasonic\5.webp)

(Under Pinout& Configuration- Connectivity > I2C1. 
Select the `I2C mode` as ‘**I2C**’ 
Then go to ‘Parameter Settings’ and set the`I2C speed mode` as ‘**Fast Mode**’)

![Image](..\Images\Ultrasonic\3.png)

- Now head over to `Timers > TIM1` and select the Clock Source as ‘`Internal Clock`.’ Then click the Parameter Settings and set the `Prescaler` as **180-1** and `Counter period` as **65536-1** as it is the maximum value for a 16 bit timer (default).

![Image](..\Images\Ultrasonic\4.png)

- Now configure GPIO Pins:
    - **PA10** as `GPIO_OUTPUT` (TRIGGER PIN [D2])
    - **PA4** as `GPIO_INPUT` (ECHO PIN [A2])


**Note1:** 
Besure to change the Prescalar value as per your system clock.
- we do this to get a `1us` pulse
- Example: 
  - System clock = 180 
  - Prescalar Value = 180-1
  - Pulse = 180Mhz/180
          = 1Mhz
  - Timeperiod = 1/freq
               = 1/1Mhz
               = 1us

**Note2:** 
Reg counter period, **65536-1** is the max value for 16 bit timer, but for this code we can use any value greater than **10**.
But max value is preffered to avoid confusion.

---

### Step 4: Code Snippet to measure distance using ultrasonic sensor and display in the 16x2 LCD Display

Paste the following code snippet inside the `/* USER CODE BEGIN Includes */` in `main.c`:

```c
#include "stdio.h"
#include "liquidcrystal_i2c.h"
```

Paste the following code snippet inside the `/* USER CODE BEGIN PD */` in `main.c`:

```c
#define TRIG_PIN GPIO_PIN_10
#define TRIG_PORT GPIOA
#define ECHO_PIN GPIO_PIN_4
#define ECHO_PORT GPIOA
```

Paste the following code snippet inside the `/* USER CODE BEGIN PV */` in `main.c`:

```c
uint32_t pMillis;
uint32_t val1 = 0;
uint32_t val2 = 0;
uint16_t distance  = 0;
```

Paste the following code snippet inside the `/* USER CODE BEGIN 2 */` in `main.c`:

```c
HAL_TIM_Base_Start(&htim1);
HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_RESET);
LCD_Init(2);
LCD_Clear();
```

Paste the following code snippet inside the `while (1)` in `main.c`:

```c
HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_SET);
__HAL_TIM_SET_COUNTER(&htim1, 0);
while (__HAL_TIM_GET_COUNTER (&htim1) < 10);  // wait for 10 us
HAL_GPIO_WritePin(TRIG_PORT, TRIG_PIN, GPIO_PIN_RESET);

pMillis = HAL_GetTick();
while (!(HAL_GPIO_ReadPin (ECHO_PORT, ECHO_PIN)) && pMillis + 10 >  HAL_GetTick());
val1 = __HAL_TIM_GET_COUNTER (&htim1);

pMillis = HAL_GetTick();
while ((HAL_GPIO_ReadPin (ECHO_PORT, ECHO_PIN)) && pMillis + 50 > HAL_GetTick());
val2 = __HAL_TIM_GET_COUNTER (&htim1);

distance = (val2-val1)* 0.034/2;

LCD_Clear();
LCD_SetCursor(0,0);
char value[20];
sprintf(value, "Distance: %dCm", distance);  // Format the string with the distance value
LCD_Print(value);  // Pass the formatted string to the function
HAL_Delay(500);
```