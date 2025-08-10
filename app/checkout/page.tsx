"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { decrementStock } from '@/lib/products-manager'
import { CheckCircle, ArrowLeft, Trash2, ShoppingBag, CreditCard, Truck, MapPin } from 'lucide-react'

export default function CheckoutPage(){
  const router = useRouter()
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { user, login, addOrder } = useAuth()
  const [createdOrderId,setCreatedOrderId]=useState<string|null>(null)
  const [processing,setProcessing]=useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  
  const canCheckout = cartItems.length>0
  
  const handleCreateOrder = () => {
    if(!canCheckout || processing) return
    setProcessing(true)
    
    if(!user) login(`guest-${Date.now()}@sessao.local`,`Visitante`)
    
    const orderItems = cartItems.map(i=>({ 
      productId:String(i.id), 
      name:i.name, 
      price:i.price, 
      quantity:i.quantity, 
      image:i.image 
    }))
    
    const order = addOrder(orderItems)
    cartItems.forEach(i=> decrementStock(String(i.id), i.quantity))
    
    // Set order details for confirmation
    setOrderDetails({
      id: order.id,
      items: orderItems,
      total: cartTotal,
      createdAt: new Date().toISOString()
    })
    
  clearCart()
  setCreatedOrderId(order.id)
  setProcessing(false)
  // Redirect to success page with order id param
  router.push(`/checkout/sucesso?order=${order.id}`)
  }

  const goToOrders = () => {
    router.push('/perfil?tab=orders')
  }

  if (createdOrderId && orderDetails) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6"/>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
            <p className="text-gray-600 mb-6">
              Seu pedido <span className="font-semibold text-uss-primary">#{createdOrderId.slice(0,8)}</span> foi criado com sucesso.
            </p>
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="font-medium">R$ {(item.price * item.quantity).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span className="text-uss-primary">R$ {orderDetails.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold text-blue-900 mb-2">Próximos passos:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Você receberá um email de confirmação</li>
                <li>• Acompanhe seu pedido na área de pedidos</li>
                <li>• Entrega em até 7 dias úteis</li>
              </ul>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Link href="/produtos" className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">
                Continuar Comprando
              </Link>
              <button 
                onClick={goToOrders}
                className="px-6 py-3 rounded-lg bg-uss-primary text-white font-medium hover:bg-uss-secondary transition"
              >
                Ver Meus Pedidos
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link href="/carrinho" className="text-sm text-uss-primary flex items-center gap-1">
            <ArrowLeft className="h-4 w-4"/>Voltar ao Carrinho
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.length===0 && (
              <div className="bg-white p-8 rounded-xl text-center border border-dashed">
                <p className="text-sm text-gray-600 mb-3">Seu carrinho está vazio.</p>
                <Link href="/produtos" className="text-uss-primary text-sm font-medium">Explorar produtos</Link>
              </div>
            )}
            {cartItems.map(item=>(
              <div key={item.id} className="bg-white p-4 rounded-lg flex gap-4 items-center border">
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800 line-clamp-2">{item.name}</p>
                  <p className="text-[11px] text-gray-500">Qtd: {item.quantity}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={()=>updateQuantity(item.id, Math.max(1,item.quantity-1))} className="px-2 py-1 text-xs border rounded">-</button>
                    <span className="text-xs w-6 text-center">{item.quantity}</span>
                    <button onClick={()=>updateQuantity(item.id, item.quantity+1)} className="px-2 py-1 text-xs border rounded">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-uss-primary">R$ {(item.price*item.quantity).toLocaleString('pt-BR',{minimumFractionDigits:2})}</p>
                  <button onClick={()=>removeFromCart(item.id)} className="mt-3 text-[11px] text-red-500 flex items-center gap-1"><Trash2 className="h-3 w-3"/>Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
              {/* Order Summary */}
              <div>
                <h2 className="font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {cartTotal.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-3">
                    <span>Total</span>
                    <span className="text-uss-primary">R$ {cartTotal.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <Truck className="h-4 w-4 text-uss-primary" />
                  <span>Entrega em até 7 dias úteis</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 text-uss-primary" />
                  <span>Frete grátis para todo Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4 text-uss-primary" />
                  <span>Pagamento seguro</span>
                </div>
              </div>

              {/* User Info */}
              {!user && (
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-3">Você finalizará como visitante. Uma conta temporária será criada.</p>
                </div>
              )}

              {/* Checkout Button */}
              <button 
                disabled={!canCheckout || processing} 
                onClick={handleCreateOrder} 
                className="w-full flex items-center justify-center gap-2 bg-uss-primary disabled:bg-gray-300 text-white text-sm py-3 rounded-lg font-medium hover:bg-uss-secondary transition-colors"
              >
                <ShoppingBag className="h-4 w-4"/>
                {processing ? 'Processando...' : 'Finalizar Pedido'}
              </button>

              {/* Security Info */}
              <div className="text-xs text-gray-500 text-center">
                🔒 Pagamento 100% seguro e protegido
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
