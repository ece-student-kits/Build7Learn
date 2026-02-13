---
sidebar_position: 2
---

# Code

`Task: Interface an LM35 sensor to measure the temperature and display in the Serial Console`

### Step 1: Create a STM32 Project "LM35"
- Create a new project & initialize all pheripherals in default configuration

---

### Step 2: Configure GPIO Pins

![Image](..\Images\LM35\2.png)

- **PA0** as `ADC1_INT0` (A0 Pin, SensorValue)

- **PA2** as `USART_TX` 
- **PA3** as `USART_RX` 

---

### Step 3: Code Snippet to read temperature using LM35 Sensor, and display in the Serial Console

Paste the following code snippet inside the `/* USER CODE BEGIN Includes */` loop in `main.c`:

```c
#include "stdio.h"
```

Paste the following code snippet inside the `/* USER CODE BEGIN 2 */` loop in `main.c`:

```c
// adc_value variable store the adc value,
// value variable store the temperature value
int adc_value, value;
// store the converted voltage value from analog value
float voltage;

int calibration_offset = 0;  // Calibrate the difference between measured temperature and actual temperature

int calibration_factor = 100; //10 mV per °C, the factor will be 100 (1V = 1000 mV)
```

Paste the following code snippet inside the `while (1)` loop in `main.c`:

```c
// start ADC convertion
HAL_ADC_Start(&hadc1);
// ADC poll for conversion
HAL_ADC_PollForConversion(&hadc1, 100);
// get the ADC conversion value
adc_value = HAL_ADC_GetValue(&hadc1);
// end ADC convertion
HAL_ADC_Stop(&hadc1);
// convert ADC value into voltage
voltage = (adc_value*3.3)/4096;
// convert the voltage into temperature
value = (voltage * calibration_factor) + calibration_offset;

// Format the complete message to send
char message[20]; // Buffer to hold the complete message to print
sprintf(message, "Temperature: %d C \n\r", value);

// Transmit the message over UART
HAL_UART_Transmit(&huart2, (uint8_t*)message, strlen(message), 10);
HAL_Delay(1000);
```