# Teste dos Alertas de Redes Sociais

## ✅ Implementação Concluída

A funcionalidade de alertas para LinkedIn e TikTok foi implementada com sucesso no ficheiro `script.js`.

## Como Testar

1. **Abrir o website:**
   - Abrir o ficheiro `index.html` no navegador
   
2. **Navegar até aos contactos:**
   - Aguardar o carregamento do boot screen e login
   - Clicar no item "CONTACTOS" na janela do portfólio

3. **Testar os links sociais:**
   - **LinkedIn:** Clicar → Deve mostrar alerta "Esta funcionalidade ainda não está disponível"
   - **TikTok:** Clicar → Deve mostrar alerta "Esta funcionalidade ainda não está disponível"
   - **GitHub:** Clicar → Deve seguir para o perfil GitHub
   - **Instagram:** Clicar → Deve seguir para o perfil Instagram

## Código Implementado

No final do ficheiro `script.js`, foi adicionado:

```javascript
// ==================== SOCIAL LINKS ALERTS ====================
// Adicionar alertas para LinkedIn e TikTok
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

## Resultado

- ✅ LinkedIn: Mostra alerta ao clicar
- ✅ TikTok: Mostra alerta ao clicar  
- ✅ GitHub: Funcional (segue para o perfil)
- ✅ Instagram: Funcional (segue para o perfil)

A implementação está pronta e funcional!
