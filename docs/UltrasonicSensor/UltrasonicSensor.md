# HC-SR04

![Image](..\Images\Ultrasonic\1(2).png)

---

## HC-SR04 Ultrasonic Sensor Specs:
- The HC-SR04 ultrasonic sensor uses sonar energy to measure distance to an object
- It consists of both the transmitter and the receiver modules.
- Specs:
     - **Range:**  2 - 400 Cm
     - **Accuracy:** 0.3 Cm
     - **Frequency:** 40 KHz

![Image](..\Images\Ultrasonic\2(2).png)

- The `transmitter` module is used to convert the electrical signal into a 40KHz burst of 8 sonar wave pulses. 
- The `receiver` module listens to the ultrasonic waves produced by the transmitter module

---

## Working of HC-SR04 Sensor

![Image](..\Images\Ultrasonic\3.jpg)

-	To start ranging with HC-SR04, first, we apply 10µs pulse to the trigger pin of the HC-SR04 sensor from STM32 Nucleo digital output pin.

-	As soon as the 10µs input trigger signal becomes active low, the transmitter circuit produces a burst of 8 ultrasonic sonar pulses. At the same time, the echo pin also makes a transition from a logic low level to a logic high level. 

-	Using the HAL libraries, we save the TIM Counter Register value (val1) on runtime when the echo pin goes high.

-	These waves travel through the air and if there is any object placed in parallel to the sensor, these waves reflect back after a collision with the object. 

-	As soon as the ultrasonic waves received by the receiver circuit after striking with an object, the echo pin goes low. At that point the TIM Counter Register value (val2) on runtime is saved as well.

-	Both these values will be used to determine the distance to an object.