"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toPng } from "html-to-image";
import { Download, LayoutGrid, Link, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { saveAs } from "file-saver";

const QrCodeGenerator = () => {
	const [url, setUrl] = useState("");
	const [color, setColor] = useState("#ffffff");
	const [bgColor, setBgColor] = useState("#057fff");
	const [logo, setLogo] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [qrType, setQrType] = useState("link");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const handleDownload = (type: "png" | "svg") => {
		const qrCodeElem = document.getElementById("qr-code");

		if (qrCodeElem) {
			if (type === "png") {
				toPng(qrCodeElem)
					.then((dataUrl) => {
						saveAs(dataUrl, "qr-code.png");
					})
					.catch((error) => {
						console.error("Error generating QR code:", error);
					});
			} else if (type === "svg") {
				const svgElem = qrCodeElem.querySelector("svg");

				if (svgElem) {
					const saveData = new Blob([svgElem.outerHTML], {
						type: "image/svg+xml;charset=utf-8",
					});

					saveAs(saveData, "qr-code.svg");
				}
			}
		}
	};

	const handleQRcodeGenerator = () => {
		const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

		setUrl(mailToLink);
	}

	return (
		<div className="relative z-10 mx-6 flex max-w-[1250px] w-full min-h-[700px] h-full">
			<Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#ecf7ff]/80 backdrop-blur-md shadow-sm border-2 border-white/40 rounded-xl">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-[#037FFF]">
						QR Code Generator
					</CardTitle>
				</CardHeader>

				<CardContent className="flex-1">
					<div className="h-full flex flex-col md:flex-row gap-8">
						<div className="flex-1 space-y-6">
							<Tabs
								defaultValue={qrType}
								className="space-y-6"
								onValueChange={(value) => setQrType(value)}
							>
								<TabsList className="h-10 w-full grid grid-cols-2 bg-[#057fff] text-lg">
									<TabsTrigger value="link" className="text-white font-bold">
										<Link className="mr-2 h-4 w-4" />
										Link
									</TabsTrigger>
									<TabsTrigger value="email" className="text-white font-bold">
										<Mail className="mr-2 h-4 w-4" />
										Email
									</TabsTrigger>
								</TabsList>

								<TabsContent value="link">
									<div className="space-y-6">
										<div className="space-y-2">
											<Label
												htmlFor="url"
												className="font-semibold text-[#057fff]"
											>
												URL
											</Label>
											<Input
												type="text"
												id="url"
												value={url}
												onChange={(e) => setUrl(e.target.value)}
												placeholder="https://example.com"
												className=" w-full bg-transparent border-2 border-white/70 focus:border-[#057fff]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
											/>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="email">
									<div className="space-y-4">
										<div className="space-y-2">
											<Label
												htmlFor="email"
												className="font-semibold text-[#057fff]"
											>
												Email
											</Label>
											<Input
												type="email"
												id="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="sY0e0@example.com"
												className=" w-full bg-transparent border-2 border-white/70 focus:border-[#057fff]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="subject"
												className="font-semibold text-[#057fff]"
											>
												Subject
											</Label>
											<Input
												type="subject"
												id="subject"
												value={subject}
												onChange={(e) => setSubject(e.target.value)}
												placeholder="Enter subject"
												className=" w-full bg-transparent border-2 border-white/70 focus:border-[#057fff]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="message"
												className="font-semibold text-[#057fff]"
											>
												Message
											</Label>
											<Textarea
												id="message"
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												placeholder="Type your message here."
												className=" w-full bg-transparent border-2 border-white/70 focus:border-[#057fff]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400 h-24 resize-none"
											/>
										</div>
										<Button onClick={handleQRcodeGenerator} className="py-7 px-8 uppercase bg-[#057fff] font-bold rounded-full">
											Generate Email Qr Code
										</Button>
									</div>
								</TabsContent>
							</Tabs>

							<div className="space-y-4">
								<div className="flex space-x-4">
									<div className="flex-1 space-y-2">
										<Label
											htmlFor="color"
											className="font-semibold text-[#057fff]"
										>
											QR Code Color
										</Label>
										<div className="flex items-center gap-1">
											<div
												className="relative w-12 h-12 flex-1 rounded-md border-2 border-white/70"
												style={{ backgroundColor: color }}
											>
												<Input
													type="color"
													id="color"
													value={color}
													onChange={(e) => setColor(e.target.value)}
													className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
												/>
											</div>
											<Input
												type="text"
												id="color"
												value={color}
												onChange={(e) => setColor(e.target.value)}
												className="flex-1 border-2 h-12 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
											/>
										</div>
									</div>
									<div className="flex-1 space-y-2">
										<Label
											htmlFor="color"
											className="font-semibold text-[#057fff]"
										>
											Background Color
										</Label>
										<div className="flex items-center gap-1">
											<div
												className="relative w-12 h-12 flex-1 rounded-md border-2 border-white/70"
												style={{ backgroundColor: bgColor }}
											>
												<Input
													type="color"
													id="color"
													value={bgColor}
													onChange={(e) => setBgColor(e.target.value)}
													className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
												/>
											</div>
											<Input
												type="text"
												id="color"
												value={bgColor}
												onChange={(e) => setBgColor(e.target.value)}
												className="flex-1 border-2 h-12 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
											/>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="logo" className="font-bold text-[#057fff]">
										Logo
									</Label>

									<Input
										type="file"
										id="logo"
										accept="image/*"
										onChange={(e) => {
											if (e.target.files && e.target.files[0]) {
												setLogoFile(e.target.files[0]);

												const reader = new FileReader();
												reader.onload = () => {
													setLogo(reader.result as string);
												};
												reader.readAsDataURL(e.target.files[0]);
											}
										}}
										className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
									/>
								</div>
							</div>
						</div>
						<div className="relative flex-1 bg-[#037fff] rounded-lg flex flex-col justify-center space-y-6">
							<span>
								<LayoutGrid className="w-8 h-8 text-white absolute top-4 right-4" />
							</span>

							<div id="qr-code" className="flex justify-center p-8">
								<div className="relative">
									<QRCodeSVG
										value={url}
										size={256}
										bgColor={bgColor}
										fgColor={color}
										imageSettings={
											logo
												? { src: logo, height: 50, width: 50, excavate: true }
												: undefined
										}
									/>
								</div>
							</div>
							<div className="flex justify-center space-x-4">
								<Button variant="outline" onClick={() => handleDownload("png")}>
									<Download className="mr-2 h-4 w-4" />
									Download PNG
								</Button>
								<Button variant="outline" onClick={() => handleDownload("svg")}>
									<Download className="mr-2 h-4 w-4" />
									Download SVG
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default QrCodeGenerator;
