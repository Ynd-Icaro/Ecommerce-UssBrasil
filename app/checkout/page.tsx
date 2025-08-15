"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Truck, MapPin, User, Lock, CheckCircle, ShoppingCart } from "lucide-react"
import { toast } from 'react-hot-toast'
import { useCart } from '@/contexts/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, cartTotal, cartCount, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [step, setStep] = useState(1) // 1: Dados, 2: Entrega, 3: Pagamento, 4: Confirmação
  
  useEffect(() => {
    setIsLoaded(true)
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      router.push('/cart')
    }
  }, [cartItems, router])

  const [formData, setFormData] = useState({
    // Dados pessoais
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",

    // Endereço
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    // Entrega
    deliveryMethod: "standard",

    // Pagamento
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    installments: "1",

    // Observações
    notes: "",
  })

  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const subtotal = cartTotal
  const deliveryFee = formData.deliveryMethod === "express" ? 49 : (subtotal > 299 ? 0 : 29.90)
  const total = subtotal + deliveryFee

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleFinishOrder = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and redirect to success page
      clearCart()
      toast.success('Pedido realizado com sucesso!')
      setOrderConfirmed(true)
      setStep(4)
    } catch (error) {
      toast.error('Erro ao processar pedido. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleConfirmOrder = async () => {
    await handleFinishOrder()
  }

  const formatCEP = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  if (orderConfirmed && step === 4) {
    return (
      <div className="min-h-screen bg-white">

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <CheckCircle className="h-24 w-24 mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-light mb-4">Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-8">
            Seu pedido foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
          </p>

          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Pedido #TS-2024-001</span>
                <Badge className="bg-green-100 text-green-800">Confirmado</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total do pedido:</span>
                <span className="font-semibold">R$ {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Forma de pagamento:</span>
                <span>Cartão de crédito</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega prevista:</span>
                <span>5-7 dias úteis</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Endereço de entrega:</h4>
                <p className="text-sm text-gray-600">
                  {formData.street}, {formData.number}
                  <br />
                  {formData.neighborhood} - {formData.city}, {formData.state}
                  <br />
                  CEP: {formData.cep}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/orders">
              <Button variant="outline" size="lg">
                Acompanhar Pedido
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: "Dados Pessoais", icon: User },
              { number: 2, title: "Entrega", icon: Truck },
              { number: 3, title: "Pagamento", icon: CreditCard },
              { number: 4, title: "Confirmação", icon: CheckCircle },
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= stepItem.number ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  <stepItem.icon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${step >= stepItem.number ? "text-blue-600" : "text-gray-400"}`}>
                    {stepItem.title}
                  </p>
                </div>
                {index < 3 && (
                  <div
                    className={`hidden sm:block w-16 h-0.5 ml-4 ${
                      step > stepItem.number ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Dados Pessoais */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Dados Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="João"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Silva"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="joao@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", formatPhone(e.target.value))}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4 flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Endereço de Entrega</span>
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="cep">CEP *</Label>
                          <Input
                            id="cep"
                            value={formData.cep}
                            onChange={(e) => handleInputChange("cep", formatCEP(e.target.value))}
                            placeholder="00000-000"
                            maxLength={9}
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="street">Rua *</Label>
                          <Input
                            id="street"
                            value={formData.street}
                            onChange={(e) => handleInputChange("street", e.target.value)}
                            placeholder="Rua das Flores"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="number">Número *</Label>
                          <Input
                            id="number"
                            value={formData.number}
                            onChange={(e) => handleInputChange("number", e.target.value)}
                            placeholder="123"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="complement">Complemento</Label>
                          <Input
                            id="complement"
                            value={formData.complement}
                            onChange={(e) => handleInputChange("complement", e.target.value)}
                            placeholder="Apto 45"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                          placeholder="Centro"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="São Paulo"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">Estado *</Label>
                          <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SP">São Paulo</SelectItem>
                              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                              <SelectItem value="MG">Minas Gerais</SelectItem>
                              <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                              {/* Adicionar outros estados */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Entrega */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Opções de Entrega</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => handleInputChange("deliveryMethod", value)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">Entrega Padrão</div>
                              <div className="text-sm text-gray-600">5-7 dias úteis</div>
                            </div>
                            <div className="text-green-600 font-medium">Grátis</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">Entrega Expressa</div>
                              <div className="text-sm text-gray-600">2-3 dias úteis</div>
                            </div>
                            <div className="font-medium">R$ 49,00</div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6">
                    <Label htmlFor="notes">Observações para entrega</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Instruções especiais para o entregador..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Pagamento */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Forma de Pagamento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5" />
                            <span className="font-medium">Cartão de Crédito</span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 bg-green-500 rounded"></div>
                              <span className="font-medium">PIX</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800">5% desconto</Badge>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod === "credit" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                          placeholder="João Silva"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade *</Label>
                          <Input
                            id="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            value={formData.cardCvv}
                            onChange={(e) => handleInputChange("cardCvv", e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="installments">Parcelamento</Label>
                        <Select
                          value={formData.installments}
                          onValueChange={(value) => handleInputChange("installments", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1x de R$ {total.toLocaleString()} sem juros</SelectItem>
                            <SelectItem value="2">2x de R$ {(total / 2).toLocaleString()} sem juros</SelectItem>
                            <SelectItem value="3">3x de R$ {(total / 3).toLocaleString()} sem juros</SelectItem>
                            <SelectItem value="6">6x de R$ {(total / 6).toLocaleString()} sem juros</SelectItem>
                            <SelectItem value="12">12x de R$ {(total / 12).toLocaleString()} sem juros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "pix" && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="font-medium text-green-800">Pagamento via PIX</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Após confirmar o pedido, você receberá o código PIX para pagamento. O pedido será processado
                        após a confirmação do pagamento.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePreviousStep} disabled={step === 1}>
                Voltar
              </Button>

              {step < 3 ? (
                <Button onClick={handleNextStep}>Continuar</Button>
              ) : (
                <Button onClick={handleConfirmOrder} className="bg-green-600 hover:bg-green-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Confirmar Pedido
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      {item.storage && (
                        <p className="text-xs text-gray-600">
                          {item.color && `${item.color} • `}{item.storage}
                        </p>
                      )}
                      <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                    </div>
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'itens'})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Entrega</span>
                    <span>{deliveryFee === 0 ? "Grátis" : formatPrice(deliveryFee)}</span>
                  </div>
                  {formData.paymentMethod === "pix" && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto PIX (5%)</span>
                      <span>-{formatPrice(total * 0.05)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    {formatPrice(formData.paymentMethod === "pix" ? (total * 0.95) : total)}
                  </span>
                </div>

                {step === 3 && formData.paymentMethod === "credit" && (
                  <div className="text-center text-sm text-gray-600">
                    <p>ou {formData.installments}x de</p>
                    <p className="font-medium">
                      {formatPrice(total / Number.parseInt(formData.installments))}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
