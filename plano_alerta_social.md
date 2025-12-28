# Plano: Adicionar Alerta "Ainda Não Disponível" para LinkedIn e TikTok

## Análise da Situação Atual
- Na secção social (`modal-contactos`), existem 4 links de redes sociais:
  - LinkedIn: `<a href="#" class="social-link">LinkedIn</a>`
  - GitHub: `<a href="#https://github.com/dianasilv7" class="social-link">GitHub</a>` 
  - Instagram: `<a href="#https://www.instagram.com/shotsbydiana_/" class="social-link">Instagram</a>`
  - TikTok: `<a href="#" class="social-link">Tiktok</a>`

## Objetivo
- Adicionar alertas para LinkedIn e TikTok quando clicados
- Manter GitHub e Instagram funcionando normalmente
- Mensagem do alerta: "Esta funcionalidade ainda não está disponível"

## Plano de Implementação

### 1. Adicionar Event Listeners
No ficheiro `script.js`, adicionar código para interceptar cliques nos links LinkedIn e TikTok

### 2. Prevenir Navegação Padrão
- Impedir que o link seja seguido normalmente
- Executar alert personalizado

### 3. Manter Funcionalidade dos Outros Links
- GitHub e Instagram devem continuar funcionando normalmente

## Ficheiros a Modificar
1. `script.js` - Adicionar event listeners para os links específicos

## Implementação
```javascript
// Adicionar após o código existente dos modais
document.addEventListener('DOMContentLoaded', function() {
  // Selecionar todos os links sociais
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const linkText = this.textContent.trim();
      
      // LinkedIn e TikTok mostram alerta
      if (linkText === 'LinkedIn' || linkText === 'Tiktok') {
        e.preventDefault();
        alert('Esta funcionalidade ainda não está disponível');
      }
      // GitHub e Instagram funcionam normalmente
      // (não fazer nada, deixa seguir o href)
    });
  });
});
```

## Resultado Esperado
- Clique em LinkedIn: mostra alerta "Esta funcionalidade ainda não está disponível"
- Clique em TikTok: mostra alerta "Esta funcionalidade ainda não está disponível"  
- Clique em GitHub: segue para o perfil
- Clique em Instagram: segue para o perfil
