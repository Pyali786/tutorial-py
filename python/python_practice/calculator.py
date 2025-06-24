def add(x, y): return x + y
def subtract(x, y): return x - y
def multiply(x, y): return x * y
def divide(x, y): return x / y if y != 0 else 'Undefined'

print("Select operation: +, -, *, /")
op = input("Operation: ")
a = float(input("Enter first number: "))
b = float(input("Enter second number: "))

if op == '+': print("Result:", add(a, b))
elif op == '-': print("Result:", subtract(a, b))
elif op == '*': print("Result:", multiply(a, b))
elif op == '/': print("Result:", divide(a, b))
else: print("Invalid operation")