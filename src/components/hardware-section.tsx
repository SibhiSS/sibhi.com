"use client"

import { Cpu, Server, Radio, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const hardwareItems = [
    {
        title: "Microcontrollers",
        icon: <Cpu className="h-6 w-6 text-primary" />,
        description: "Experience with ESP32, Arduino, and STM32 for edge computing and IoT applications.",
    },
    {
        title: "Sensor Integration",
        icon: <Radio className="h-6 w-6 text-primary" />,
        description: "Interfacing standard protocols (I2C, SPI, UART) with environmental and biometric sensors.",
    },
    {
        title: "Embedded Linux",
        icon: <Server className="h-6 w-6 text-primary" />,
        description: "Configuring and hardening Raspberry Pi and custom Linux distributions for secure deployments.",
    },
    {
        title: "Vulnerability Analysis",
        icon: <Zap className="h-6 w-6 text-primary" />,
        description: "Hardware hacking and firmware analysis using UART bridging and JTAG debugging.",
    },
]

export function HardwareSection() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-24 bg-muted/20">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Hardware & Embedded Systems</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Bridging the gap between physical hardware and secure software.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {hardwareItems.map((item) => (
                    <Card key={item.title} className="bg-card/30 border-primary/10">
                        <CardHeader>
                            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                {item.icon}
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
