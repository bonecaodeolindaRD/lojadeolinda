package br.com.rd.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		System.setProperty("server.servlet.context-path", "/ecommerce");
		SpringApplication.run(EcommerceApplication.class, args);
	}

}
