package main

import (
    "fmt"
    "net"
    "sync"
    "time"
)

var (
    host         	= "0.0.0.0"
    port         	= "5555"
    numThreads   	= 100
    numIterations 	= 100
)

func main() {
    var wg sync.WaitGroup
    startTime := time.Now()

    for i := 0; i < numThreads; i++ {
        wg.Add(1)
        go worker(&wg)
    }

    wg.Wait()
    endTime := time.Now()
	elapsedTime := endTime.Sub(startTime)

    fmt.Println("All messages sent!")
    fmt.Println("Elapsed time:", elapsedTime)
}

func worker(wg *sync.WaitGroup) {
    defer wg.Done()
    for j := 0; j < numIterations; j++ {
        conn, err := net.Dial("udp", host+":"+port)
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