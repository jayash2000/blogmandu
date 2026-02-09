<template>
  <section class="h-full px-12 py-8">
    <H1
      title="The Art of Mindful Living: Finding Peace in a Busy World"
      class="text-3xl font-black"
    />

    <section class="flex items-center gap-4 py-4">
      <Avatar
        class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
      >
        <AvatarImage src="https://www.github.com/bot.png" />
      </Avatar>

      <span class="text-primary font-medium text-sm">John Nepali</span>

      <div class="text-sm">
        Published on
        <span class="font-semibold text-accent-foreground">
          {{
            new Date(Date.now()).toUTCString().split(" ").slice(0, 4).join(" ")
          }}
        </span>
      </div>
    </section>

    <section class="flex items-center gap-4">
      <Button
        variant="outline"
        class="p-3 cursor-pointer"
        v-for="icon in POST_DETAIL_BUTTONS_ICON"
        :key="icon.id"
      >
        <Icon :name="icon.name" />
      </Button>
    </section>

    <article class="flex flex-col gap-6 py-4">
      <figure class="w-full h-[60vh] rounded overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="beach"
          class="w-full h-full object-cover"
        />
      </figure>

      <p class="text-justify font-thin">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sed
        libero amet sit vero error et voluptates debitis! Iusto placeat animi
        quod rem omnis praesentium tenetur, doloremque eligendi enim officia
        itaque at perferendis porro qui magnam. Quae voluptatibus tempore quo
        voluptatem quod accusantium, sit quasi fugiat quam voluptatum assumenda
        a qui libero magni, corporis asperiores quia aspernatur optio veritatis!
        Aperiam numquam laborum omnis doloribus dicta eos voluptatibus quia!
        Placeat corrupti pariatur voluptatibus nihil beatae eos perferendis
        consectetur aliquam velit, eligendi voluptas blanditiis aperiam delectus
        sint facilis deserunt quidem laborum ullam magnam totam. Accusantium
        molestias deserunt officia? Saepe natus eveniet ipsa, earum iure ad
        officiis quod dignissimos. Vitae adipisci quos, nostrum accusamus
        facere, aspernatur blanditiis, expedita odit quasi enim ipsa beatae
        iusto doloribus? Velit, voluptatem aliquid? Nostrum fuga veniam
        perferendis assumenda. Esse, impedit ex? Provident sunt eligendi alias
        perferendis architecto minus similique corporis accusamus. Unde non
        tenetur debitis quaerat, magnam mollitia quibusdam excepturi iusto
        ratione aspernatur in laborum aliquam placeat voluptatem voluptatum
        consectetur, perspiciatis illum quisquam sequi ea exercitationem!
        Delectus quas praesentium assumenda? Deleniti suscipit dolore temporibus
        aspernatur rem. Quisquam enim dolore, assumenda quidem ipsum voluptate
        optio cupiditate distinctio saepe expedita ducimus ipsam. Nulla, rerum.
        Totam iste deleniti dicta commodi quo, id similique? Quaerat, dolor.
        Ducimus nobis veniam nisi, iste praesentium totam tempore error rerum
        aliquid, cum minus animi ipsum tenetur? Consequuntur, cupiditate fuga
        adipisci dicta ad praesentium aut mollitia rem fugit exercitationem
        placeat atque porro ullam cumque minus soluta optio earum asperiores
        facilis architecto velit esse? Obcaecati dolorem repudiandae alias illum
        doloremque assumenda odit vel labore, quidem quibusdam magnam quos
        molestias explicabo aperiam commodi vero ducimus eius excepturi facere
        rem? Ad exercitationem pariatur reprehenderit nobis nisi iusto dolore
        alias autem vero. Sed quasi dolorum illum harum ipsum, quas pariatur
        ducimus magnam quae accusamus, voluptatum consequatur sit eveniet! Nemo
        nulla nihil molestiae deleniti saepe facilis accusantium qui, quis fuga
        corrupti quisquam iste architecto hic! Dicta ducimus officia numquam
        quasi sit aut fugiat dolorem quidem inventore quae architecto veniam
        nisi maxime minus, iure quos aliquam nulla expedita? Minus quo laborum
        alias quis quia eaque. Magnam dignissimos ipsum harum quam sequi
        perspiciatis dicta consequuntur in distinctio error quasi odio quibusdam
        fuga, illo accusantium magni, odit culpa laudantium vitae aspernatur
        veritatis reprehenderit corporis? Labore ab odio dolore corporis id
        soluta fugiat qui animi temporibus rem cumque iure blanditiis magnam
        tenetur quidem dolorem quia saepe autem optio aut, beatae sit nemo
        totam? Tempora, enim mollitia! Ipsa iste dolores architecto, earum
        molestias optio reiciendis rerum cum voluptatum recusandae magni aliquid
        velit accusamus obcaecati ratione nam quibusdam eos? Atque quod eos quas
        nemo placeat porro sed modi, iste commodi expedita voluptatem incidunt
        asperiores aperiam veniam in unde aspernatur quasi quis enim! Quidem
        tempora repudiandae amet debitis, doloremque quas ex culpa aliquid odit
        exercitationem quasi, id natus accusamus quo expedita? Accusantium,
        temporibus dicta! Officia, voluptates. Facilis possimus ea tenetur sit
        delectus aut architecto itaque, ipsa minima eum blanditiis velit
        repellat, quo corrupti quasi odio eaque, reiciendis laborum hic
        suscipit? Vitae mollitia dolores, alias qui quia nisi quis commodi?
      </p>

      <section class="space-x-4">
        <Badge variant="secondary"> Mindfulness </Badge>
        <Badge variant="secondary"> Wellness </Badge>
        <Badge variant="secondary"> Self-Improvement </Badge>
        <Badge variant="secondary"> Meditation </Badge>
        <Badge variant="secondary"> Inner Peace </Badge>
      </section>
    </article>

    <section class="py-4 space-y-4">
      <H1 title="Comments(3)" />

      <Textarea placeholder="Write your comment here..." v-model="comment" />

      <Button>Post Comment</Button>
    </section>

    <section class="flex gap-4 py-4">
      <Avatar
        class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
      >
        <AvatarImage src="https://www.github.com/hello.png" />
      </Avatar>

      <section class="space-y-2 text-sm">
        <div class="flex items-center gap-2">
          <span class="font-semibold">Mark Watt</span>
          <span class="text-muted-foreground">2 hours ago</span>
        </div>

        <p class="text-justify">
          This is a truly insightful article. I've been looking for ways to
          integrate more mindfulness into my daily routine, and your practical
          tips are very helpful. Thank you!
        </p>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import H1 from "~/components/custom/headings/H1.vue";
import { Textarea } from "~/components/ui/textarea";

const comment = ref<string>("");
</script>
