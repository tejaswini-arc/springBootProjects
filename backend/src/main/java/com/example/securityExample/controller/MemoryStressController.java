package com.example.securityExample.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/memory")
public class MemoryStressController {

    // stays in memory as long as app runs
    private final List<byte[]> memoryHolder = new ArrayList<>();
    private final Map<String, byte[]> hashMapHolder = new HashMap<>();

    // Thread 1 — fills a list with large byte arrays
    @GetMapping("/thread-stress")
    public String threadStress() throws InterruptedException {
        Thread t1 = new Thread(() -> {
            System.out.println("Thread 1 started - filling List");
            for (int i = 0; i < 100; i++) {
                memoryHolder.add(new byte[1024 * 1024]); // 1MB per iteration = 100MB
                try { Thread.sleep(50); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            }
            System.out.println("Thread 1 done - List size: " + memoryHolder.size() + " MB");
        });

        // Thread 2 — fills a HashMap with large byte arrays
        Thread t2 = new Thread(() -> {
            System.out.println("Thread 2 started - filling HashMap");
            for (int i = 0; i < 100; i++) {
                hashMapHolder.put("key-" + i, new byte[1024 * 1024]); // 1MB per key = 100MB
                try { Thread.sleep(50); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            }
            System.out.println("Thread 2 done - HashMap size: " + hashMapHolder.size() + " MB");
        });

        t1.start();
        t2.start();

        return "2 threads started - watch heap in VisualVM!";
    }

    // clears memory after analysis
    @GetMapping("/clear")
    public String clear() {
        memoryHolder.clear();
        hashMapHolder.clear();
        // force GC multiple times to ensure collection
        for (int i = 0; i < 3; i++) {
            System.gc();
            try { Thread.sleep(500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }
        Runtime runtime = Runtime.getRuntime();
        long usedAfter = (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024;
        return "Memory cleared! Used memory now: " + usedAfter + " MB";
    }


    // shows current memory stats
    @GetMapping("/stats")
    public Map<String, String> stats() {
        Runtime runtime = Runtime.getRuntime();
        Map<String, String> stats = new HashMap<>();
        stats.put("usedMemory", ((runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024) + " MB");
        stats.put("freeMemory", (runtime.freeMemory() / 1024 / 1024) + " MB");
        stats.put("totalMemory", (runtime.totalMemory() / 1024 / 1024) + " MB");
        stats.put("maxMemory", (runtime.maxMemory() / 1024 / 1024) + " MB");
        stats.put("listSize", memoryHolder.size() + " MB");
        stats.put("hashMapSize", hashMapHolder.size() + " MB");
        return stats;
    }
}
