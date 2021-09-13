# is your birthday lucky?

- Take user's complete birthday 
- And his/her lucky number. 
- Now, find out if sum of digits of birthday is divisible by the lucky number. 
- Show the result to user with some graphics. 

## additional

- Create this as a website, put a privacy notice. Say that you're not storing data. 
- Use the footer to redirect to your social media accounts and your portfolio. 

## hint
Use [modulo operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) to separate digits.

## stack
Can use CLI, vanillaJS and or React for this. 


## adding features
- day-in-week-algo - be able to find the day of any date in any year in any month.

- algorith for the day in case we dont use the computer
- example 26 - 07 - 2000 
- date + month code + century code + last digit of century + leap year in that century = value 
- value /7 = remainder code - for the day.



- month code - 144 025 036 146 jan to dec
- century code - 1500 -1599 - 0
- 1600 -1699 - 6
- 1700 -1799 - 4 
- 1800 -1899 - 2 
- 1900 -1999 - 0 
- 2000 -2099 - 6 
- repeat after it

remainder code - 
 0  - saturday
 1 - sunday 
 2 - monday
 so on till 6 - friday

 unlike the convention in programming

 0 - sunday
 1 - monday 
--- till 6 - saturday

26 + 0 + 6 + 0+ 0 = 32 / 7
 4 remainder 
 4 - wednesday 

 in case of the leap year and the month is jan then we subtract the value 1 from the leap year.





