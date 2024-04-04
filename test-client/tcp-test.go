package main

import (
	"fmt"
	"net"
	"sync"
)

var (
	host         	= "localhost"
	port         	= "5555"
	numThreads   	= 100
	numIterations 	= 100
)

func main() {
	var wg sync.WaitGroup
	for i := 0; i < numThreads; i++ {
		wg.Add(1)
		go worker(&wg)
	}
	wg.Wait()
	fmt.Println("All messages sent!")
}

func worker(wg *sync.WaitGroup) {
	defer wg.Done()
	for j := 0; j < numIterations; j++ {
		conn, err := net.Dial("tcp", host+":"+port)
		if err != nil {
			fmt.Println("Error connecting to the server:", err)
			return
		}
		message := "a"
		_, err = conn.Write([]byte(message))
		if err != nil {
			fmt.Println("Error sending message:", err)
			return
		}
		conn.Close()
	}
}