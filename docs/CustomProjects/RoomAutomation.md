# RoomAutomation

- **This project is the combination of several modules**
    - `LCD Room Temperature Display:` Temperature Sensor(LM35)  -->  LCD_Display
    - `Automatic Door Control:` IR Sensor(detect Obstacle)  -->  Servo(180 degrees/0 degrees) [Open/Close Door]
    - `Automated Night Lamp:` LDR Module(Detect absence of Light)  -->  Relay controlled Night Lamp

- In addition to the modules learned, I have additionally included `HAL_GetTick()` function to implement `Non-Blocking Delay` instead of `HAL_Delay()` function which is Blocking

---

### Steps to Implement this Project

- Initialize the Clock as per the steps in Servo module in the Docs
- Initialize LCD Display pins and logic by following the procedures in the LCD Display module in the Docs
- Configure PWM and timer, for Servo control reffering the Servo module in Docs
- Initialize ADC by following the AnalogSensors: LM35 module procedures in the Docs
- Initialize the pins and logic of IR Sensor and LDR Module by reffering the procedures of DigitalSenors: IR_LED module in the Docs
- Use Non-Blocking delay instead of Blocking delay as stated above in the logic requirement after generating the code

---

### Pinout & Clock Config

- Clock Config

![Image](..\Images\Servo\3.png)

- Pinout

![Image](..\Images\CustomProjects\1.png)

- **PA0** as `ADC1_IN0` (LM35)
- **PA1** as `TIM2_CH2` (Servo)
- **PA6** as `GPIO Input` (IR_Sensor)
- **PB10** as `GPIO Output` (RelayBulb)
- **PA8** as `GPIO Input` (LDR)
- **PB8** as `I2C1_SCL`
- **PB9** as `I2C1_SDA`

---

### Code

Paste the following code snippet inside the `/* USER CODE BEGIN Includes */` in `main.`:

```c
#include "stdio.h"
#include "liquidcrystal_i2c.h"
```

Paste the following code snippet inside the `/* USER CODE BEGIN PV */` in `main.c`:

```c
uint32_t previousTime = 0;  // for non-blocking delay in main loop
uint32_t ledPreviousTime = 0; // for LED control delay
uint32_t servoPreviousTime = 0; // for Servo control delay
```

Paste the following code snippet inside the `/* USER CODE BEGIN PFP */` in `main.c`:

```c
int angle(int val);
void door();
void light();
void temp();
```

Paste the following code snippet inside the `/* USER CODE BEGIN 2 */` in `main.c`:

```c
  HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_2);

  LCD_Init(2);
  LCD_NoCursor();
```

Paste the following code snippet inside the `/* USER CODE BEGIN 3 */` in `while(1)` under `main.c`:

```c
   temp();
   light();
   door();
```

Paste the following code snippet inside the `/* USER CODE BEGIN 4 */` in `main.c`:

```c
int angle(int val){
	int per_deg = 5.55;  //pulse value for 1° Rotation
	int pulse = 250 + (val * per_deg);  // calculate pulse value, starting from 25
	return pulse;
}

void temp(){
	  // adc_value variable store the adc value,
	  // value variable store the temperature value
	  int adc_value, value;
	  // store the converted voltage value from analog value
	  float voltage;

	  int calibration_offset = 20;  // Calibrate the difference between measured temperature and actual temperature

	  int calibration_factor = 100; //10 mV per °C, the factor will be 100 (1V = 1000 mV)
    // start ADC convertion
	  HAL_ADC_Start(&hadc1);
	  HAL_ADC_PollForConversion(&hadc1, 100);
	  adc_value = HAL_ADC_GetValue(&hadc1);
	  HAL_ADC_Stop(&hadc1);

	  if (HAL_GetTick() - previousTime >= 3000) {
		  previousTime = HAL_GetTick();
		  voltage = (adc_value * 3.3) / 4096;
		  value = (voltage * calibration_factor) - calibration_offset;

		  char message[20];
		  sprintf(message, "Temp: %d C \n\r", value);

		  LCD_Clear();
		  LCD_SetCursor(0, 0);
		  LCD_Print(message);
	  }
}

void light(){
	  // Replace HAL_Delay(5000) with non-blocking delay
	  if ((HAL_GetTick() - ledPreviousTime >= 5000)||(!HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_8))) {
		if (HAL_GetTick() - ledPreviousTime >= 5000) {
		ledPreviousTime = HAL_GetTick();
		// Check user button on GPIOA, GPIO_PIN_8
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);
		HAL_GPIO_WritePin(GPIOB, GPIO_PIN_10, GPIO_PIN_SET);}}
	  else {
		HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);
		HAL_GPIO_WritePin(GPIOB, GPIO_PIN_10, GPIO_PIN_RESET);
	  }
}

void door(){
	  // Servo angle control with non-blocking delay
	  // Check if object is detected by the IR sensor (connected to GPIOA, GPIO_PIN_6)
	  if ((HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_6))||(HAL_GetTick() - servoPreviousTime >= 5000)){
	      // If it's time to rotate the servo or the servo is already at 180 degrees
	      if (HAL_GetTick() - servoPreviousTime >= 5000) {
	          servoPreviousTime = HAL_GetTick();  // Reset the timer
	          __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_2, angle(180));  // Set servo to 180 degrees
	      }
	  } else {
	      // No object detected, set the servo to 0 degrees immediately
	      __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_2, angle(0));
	  }
}
```