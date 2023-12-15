const stubs = {
    c: `
  // Online C compiler to run C program online
  #include <stdio.h>
  
  int main() {
      printf("Hello, World!\\n");
      return 0;
  }
    `,
  
    cpp: `
  // Online C++ compiler to run C++ program online
  #include <iostream>
  
  int main() {
      std::cout << "Hello, World!" << std::endl;
      return 0;
  }
    `,
  
    java: `
  // Online Java compiler to run Java program online
  public class Main {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }
    `,
  
    py: `
# Online Python interpreter to run Python code online
print("Hello, World!")
    `,
  
    rb: `
  # Online Ruby interpreter to run Ruby code online
  puts "Hello, World!"
    `,
  
    cs: `
  // Online C# compiler to run C# program online
  using System;
  
  class Program {
      static void Main() {
          Console.WriteLine("Hello, World!");
      }
  }
    `,
  
    js: `
  // Online JavaScript interpreter to run JavaScript code online
  console.log("Hello, World!");
    `,
  
    go: `
  // Online Go interpreter to run Go code online
  package main
  
  import "fmt"
  
  func main() {
      fmt.Println("Hello, World!")
  }
    `,
  
    
    php: `
  // Online PHP interpreter to run PHP code online
  <?php
      echo "Hello, World!";
  ?>
    `,
  
    rs: `
  // Online Rust compiler to run Rust code online
  fn main() {
      println!("Hello, World!");
  }
    `,
  
    ts: `
  // Online TypeScript interpreter to run TypeScript code online
  console.log("Hello, World!");
    `,
  
   
  };
  
export default stubs;