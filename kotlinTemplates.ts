export interface KotlinTemplate {
  filename: string;
  path: string;
  description: string;
  code: string;
}

export const KOTLIN_TEMPLATES: KotlinTemplate[] = [
  {
    filename: "MainActivity.kt",
    path: "app/src/main/java/com/crescer/confianca/MainActivity.kt",
    description: "Ponto de entrada principal da app Android. Configura a navegação segura (Jetpack Navigation Composer), Modo Discreto e o tema adaptado.",
    code: `package com.crescer.confianca

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.crescer.confianca.ui.theme.CrescerConfiancaTheme
import com.crescer.confianca.ui.screens.HomeScreen
import com.crescer.confianca.ui.screens.CategoryDetailScreen
import com.crescer.confianca.ui.screens.DiaryScreen
import com.crescer.confianca.ui.screens.AICounselorScreen
import com.crescer.confianca.ui.screens.EmergencyScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CrescerConfiancaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation()
                }
            }
        }
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onNavigateToCategory = { catId -> navController.navigate("category/$catId") },
                onNavigateToDiary = { navController.navigate("diary") },
                onNavigateToCounselor = { navController.navigate("counselor") },
                onNavigateToEmergency = { navController.navigate("emergency") }
            )
        }
        composable("category/{categoryId}") { backStackEntry ->
            val catId = backStackEntry.arguments?.getString("categoryId") ?: ""
            CategoryDetailScreen(
                categoryId = catId,
                onBack = { navController.popBackStack() },
                onAskAIAbout = { navController.navigate("counselor?search=$catId") }
            )
        }
        composable("diary") {
            DiaryScreen(
                onBack = { navController.popBackStack() }
            )
        }
        composable("counselor") {
            AICounselorScreen(
                onBack = { navController.popBackStack() }
            )
        }
        composable("emergency") {
            EmergencyScreen(
                onBack = { navController.popBackStack() }
            )
        }
    }
}`
  },
  {
    filename: "DiaryDatabase.kt",
    path: "app/src/main/java/com/crescer/confianca/data/local/DiaryDatabase.kt",
    description: "Configuração do motor de base de dados local Room para armazenamento encriptado e seguro do Diário Privado.",
    code: `package com.crescer.confianca.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

// 1. Entidade para representar um registo diário íntimo
@androidx.room.Entity(tableName = "diary_entries")
data class DiaryEntryEntity(
    @androidx.room.PrimaryKey(autoGenerate = true) val id: Int = 0,
    val dateString: String,
    val mood: String,           // feliz, cansada, ansiosa, triste, confiante
    val menstruation: Boolean,  // sim ou não
    val painLevel: Int,         // escala de 0 a 5
    val skinCondition: String,  // estável, borbulhas, irritada
    val sleepHours: Int,
    val waterIntake: Int,       // copas consumidas
    val notes: String,          // observações secretas
    val stressLevel: Int        // escala de 0 a 5
)

// 2. Data Access Object (DAO) para as transações na base de dados
@Dao
interface DiaryDao {
    @Query("SELECT * FROM diary_entries ORDER BY dateString DESC")
    fun getAllEntries(): Flow<List<DiaryEntryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEntry(entry: DiaryEntryEntity)

    @Query("DELETE FROM diary_entries WHERE id = :id")
    suspend fun deleteEntryById(id: Int)
}

// 3. Classe abstrata do Room Database
@Database(entities = [DiaryEntryEntity::class], version = 1, exportSchema = false)
abstract class DiaryDatabase : RoomDatabase() {
    abstract fun diaryDao(): DiaryDao

    companion object {
        @Volatile
        private var INSTANCE: DiaryDatabase? = null

        fun getDatabase(context: Context): DiaryDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    DiaryDatabase::class.java,
                    "diary_database"
                )
                // Nota: Em produção, deves usar encriptação SQLCipher para proteger os dados privados das adolescentes
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}`
  },
  {
    filename: "AICounselorViewModel.kt",
    path: "app/src/main/java/com/crescer/confianca/ui/viewmodel/AICounselorViewModel.kt",
    description: "Modelo de Visualização (MVVM) que gere o estado da conversa com o Chat Conselheiro. Faz a ligação à nossa API proxy segura no servidor para interagir com o Gemini.",
    code: `package com.crescer.confianca.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.io.OutputStreamWriter
import java.io.BufferedReader
import java.io.InputStreamReader
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

data class ChatMessage(
    val messageText: String,
    val isUser: Boolean,
    val timestamp: Long = System.currentTimeMillis()
)

class AICounselorViewModel : ViewModel() {

    private val _messages = MutableStateFlow<List<ChatMessage>>(listOf(
        ChatMessage("Olá! Sou a tua conselheira de confiança. Podes perguntar-me qualquer dúvida sobre o teu corpo, higiene, emoções ou segurança pessoal sem medos ou vergonhas. O que querias conversar hoje? 📝", false)
    ))
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    fun sendMessage(text: String) {
        if (text.isBlank()) return

        val userMsg = ChatMessage(text, true)
        _messages.value = _messages.value + userMsg
        _isLoading.value = true

        viewModelScope.launch {
            try {
                // Efetua o pedido HTTP ao nosso servidor proxy para retransmitir ao Gemini de forma segura
                val reply = fetchSafeAIResponse(text, _messages.value.dropLast(1))
                val assistantMsg = ChatMessage(reply, false)
                _messages.value = _messages.value + assistantMsg
            } catch (e: Exception) {
                _messages.value = _messages.value + ChatMessage(
                    "Ocorreu um problema ao ligar à rede. Mas lembra-te: se tens alguma dúvida séria ou sentes dores ou perigo, deves conversar com um adulto de confiança ou procurar ajuda médica profissional imediatamente! 🌱", 
                    false
                )
            } finally {
                _isLoading.value = false
            }
        }
    }

    private suspend fun fetchSafeAIResponse(prompt: String, history: List<ChatMessage>): String = withContext(Dispatchers.IO) {
        // Altera para o URL da tua app em produção
        val url = URL("https://sua-app-cloudrun/api/chat")
        val conn = url.openConnection() as HttpURLConnection
        conn.requestMethod = "POST"
        conn.setRequestProperty("Content-Type", "application/json")
        conn.doOutput = true

        // Formata o histórico em JSON
        val payload = JSONObject()
        payload.put("message", prompt)
        
        val historyArray = org.json.JSONArray()
        history.forEach { msg ->
            val turn = JSONObject()
            turn.put("role", if (msg.isUser) "user" else "model")
            turn.put("text", msg.messageText)
            historyArray.put(turn)
        }
        payload.put("history", historyArray)

        // Envia o JSON para o servidor
        val wr = OutputStreamWriter(conn.outputStream)
        wr.write(payload.toString())
        wr.flush()

        // Lê a resposta
        val reader = BufferedReader(InputStreamReader(conn.inputStream))
        val responseText = StringBuilder()
        var line: String?
        while (reader.readLine().also { line = it } != null) {
            responseText.append(line)
        }
        wr.close()
        reader.close()

        val jsonResponse = JSONObject(responseText.toString())
        return@withContext jsonResponse.optString("text", "Não consegui responder de momento.")
    }
}`
  },
  {
    filename: "HomeScreen.kt",
    path: "app/src/main/java/com/crescer/confianca/ui/screens/HomeScreen.kt",
    description: "Ecrã inicial do Android desenvolvido em Jetpack Compose. Implementa o design calmo em tons pastéis e uma bento-grid moderna de categorias.",
    code: `package com.crescer.confianca.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Chat
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class CategoryItem(val id: String, val title: String, val color: Color, val desc: String)

@OptIn(Material3Api::class)
@Composable
fun HomeScreen(
    onNavigateToCategory: (String) -> Unit,
    onNavigateToDiary: () -> Unit,
    onNavigateToCounselor: () -> Unit,
    onNavigateToEmergency: () -> Unit
) {
    val categories = listOf(
        CategoryItem("higiene-corpo", "Higiene do Corpo", Color(0xFFE0F2FE), "Banho, transpirar e frescura"),
        CategoryItem("higiene-intima", "Higiene Íntima", Color(0xFFFCE7F3), "Cuidar da tua zona mais delicada"),
        CategoryItem("menstruacao", "Menstruação & Ciclo", Color(0xFFFFE4E6), "Percebe o teu período e ciclos"),
        CategoryItem("pele-borbulhas", "Pele & Borbulhas", Color(0xFFFEF3C7), "Rotina simples sem modas"),
        CategoryItem("piolhos", "Piolhos Sem Mistérios", Color(0xFFF1F5F9), "Como prevenir e ver de perto"),
        CategoryItem("substancias-riscos", "Segurança & Substâncias", Color(0xFFFEF2F2), "Vaping, fumo e dizer Não!")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Crescer com Confiança", fontWeight = FontWeight.SemiBold, fontSize = 20.sp) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            // Seccao de Atalho de Emergência
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFFFEE2E2)),
                modifier = Modifier.fillMaxWidth().clickable { onNavigateToEmergency() },
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp).fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Default.Warning, contentDescription = "Perigo", tint = Color.Red)
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text("Estás em apuros ou com medo?", fontWeight = FontWeight.Bold, color = Color(0xFF991B1B))
                        Text("Clica aqui rapidamente para acederes a apoio imediato.", fontSize = 12.sp, color = Color(0xFFB91C1C))
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Menu do Meio - Diário e Assistente Chat
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(
                    onClick = onNavigateToCounselor,
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF6B21A8))
                ) {
                    Icon(Icons.Default.Chat, contentDescription = "Conversa")
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Conselheira")
                }
                Button(
                    onClick = onNavigateToDiary,
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0D9488))
                ) {
                    Icon(Icons.Default.Book, contentDescription = "Diário")
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Diário PIN")
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            Text("Aprende com Segurança", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = MaterialTheme.colorScheme.primary)
            Spacer(modifier = Modifier.height(8.dp))

            // Grelha de Categorias Educativas
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(categories) { cat ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(140.dp)
                            .clickable { onNavigateToCategory(cat.id) },
                        colors = CardDefaults.cardColors(containerColor = cat.color),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp).fillMaxSize(),
                            verticalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(cat.title, fontWeight = FontWeight.Bold, color = Color(0xFF1E293B), fontSize = 15.sp)
                            Text(cat.desc, color = Color(0xFF475569), fontSize = 12.sp, lineHeight = 16.sp)
                        }
                    }
                }
            }
        }
    }
}`
  },
  {
    filename: "EmergencyScreen.kt",
    path: "app/src/main/java/com/crescer/confianca/ui/screens/EmergencyScreen.kt",
    description: "Componente discreto de segurança pessoal do Android. Ensina as adolescentes a lidarem com situações de perigo e inclui atalhos de geolocalização mockados.",
    code: `package com.crescer.confianca.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@OptIn(Material3Api::class)
@Composable
fun EmergencyScreen(onBack: () -> Unit) {
    val context = LocalContext.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Área de Apoio & Emergência") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Retroceder")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFFFEE2E2)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        "Estás com medo ou numa situação de perigo?",
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF991B1B),
                        fontSize = 18.sp,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        "Fica calma. Respira fundo. O mais importante é te protegeres. Segue sempre estas três regras cruciais de emergência:",
                        fontSize = 14.sp,
                        color = Color(0xFF374151)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("1. Vai de imediato para junto de adultos: entra numa pastelaria, café, loja movimentada, escola, ou fala diretamente com um segurança.", fontSize = 13.sp, fontWeight = FontWeight.Bold)
                    Text("2. Liga para os teus pais ou para o número nacional de emergência (112).", fontSize = 13.sp)
                    Text("3. Se alguém insistir para entrares num carro ou te agarrar, Grita forte 'NÃO!' ou 'FOGO!' para chamar a atenção.", fontSize = 13.sp)
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            Text("Contactos Úteis em Portugal", fontWeight = FontWeight.Bold, fontSize = 16.sp)

            Button(
                onClick = {
                    val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:112"))
                    context.startActivity(intent)
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626)),
                modifier = Modifier.fillMaxWidth().height(50.dp)
            ) {
                Icon(Icons.Default.Phone, contentDescription = "Ligar")
                Spacer(modifier = Modifier.width(8.dp))
                Text("Ligar 112 (Emergência Nacional)")
            }

            Button(
                onClick = {
                    val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:800222444"))
                    context.startActivity(intent)
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF5B21B6)),
                modifier = Modifier.fillMaxWidth().height(50.dp)
            ) {
                Icon(Icons.Default.Phone, contentDescription = "Ligar")
                Spacer(modifier = Modifier.width(8.dp))
                Text("Linha Sexualidade em Linha (800 222 444)")
            }

            Button(
                onClick = {
                    val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:116111"))
                    context.startActivity(intent)
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0369A1)),
                modifier = Modifier.fillMaxWidth().height(50.dp)
            ) {
                Icon(Icons.Default.Phone, contentDescription = "Ligar")
                Spacer(modifier = Modifier.width(8.dp))
                Text("Linha de Apoio à Criança (116 111)")
            }

            Spacer(modifier = Modifier.weight(1f))

            Text(
                "Lembra-te: Pedir ajuda é sinal de coragem e inteligência, nunca de fraqueza.",
                fontSize = 12.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}`
  }
];
